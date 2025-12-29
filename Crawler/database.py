import os
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from dotenv import load_dotenv
from datetime import datetime
from utils import slugify
from config import CATEGORY_MAPPING # Import từ điển tên

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("SportNewsFE")
articles_col = db["articles"]
categories_col = db["categories"]
matches_col = db["matches"]

try:
    articles_col.create_index("source_url", unique=True)
    articles_col.create_index("slug", unique=True)
    categories_col.create_index("slug", unique=True)
except:
    pass

# Hàm tạo danh mục (Hỗ trợ cả Cha và Con)
def get_or_create_category(cat_name, parent_id=None):
    if not cat_name: return None

    clean_name = cat_name.strip()
    clean_slug = slugify(clean_name)

    # 1. Tìm xem có chưa
    existing = categories_col.find_one({"slug": clean_slug})
    if existing:
        return existing["_id"]

    # 2. Chưa có thì tạo
    new_cat = {
        "name": clean_name,
        "slug": clean_slug,
        "parent": parent_id, # <--- QUAN TRỌNG: Lưu ID cha vào đây
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    }
    try:
        result = categories_col.insert_one(new_cat)
        p_text = f" (Con của {parent_id})" if parent_id else " (Gốc)"
        print(f"--> Tạo Category: {clean_name}{p_text}")
        return result.inserted_id
    except DuplicateKeyError:
        existing_retry = categories_col.find_one({"slug": clean_slug})
        return existing_retry["_id"] if existing_retry else None

def save_article_to_db(data):
    try:
        # --- LOGIC XỬ LÝ CHA CON MỚI ---
        parent_slug = data.get("parent_slug") # VD: bong-da-phap
        child_name = data.get("category_name") # VD: VĐQG Pháp

        final_cat_id = None

        # Bước 1: Tìm hoặc Tạo danh mục CHA trước
        parent_name = CATEGORY_MAPPING.get(parent_slug, "Tin tức chung")
        parent_id = get_or_create_category(parent_name, parent_id=None)

        # Bước 2: Xử lý danh mục CON
        # Nếu tên con giống hệt tên cha hoặc rỗng -> Bài viết thuộc về cha luôn
        if not child_name or slugify(child_name) == slugify(parent_name):
            final_cat_id = parent_id
        else:
            # Nếu tên con khác tên cha -> Tạo con và trỏ về cha
            final_cat_id = get_or_create_category(child_name, parent_id=parent_id)

        # --------------------------------

        update_data = {
            "title": data["title"],
            "slug": data["slug"],
            "sapo": data["sapo"],
            "content": data["content_html"],
            "thumbnail": data["thumbnail"],
            "author": data["author"],
            "original_published_at": data["published_at"],
            "category": final_cat_id, # Lưu ID cuối cùng (Con hoặc Cha)
            "source_url": data["source_url"],
            "updatedAt": datetime.now()
        }

        insert_data = {
            "createdAt": datetime.now(),
            "views": 0
        }

        query = {"source_url": data["source_url"]}

        articles_col.update_one(
            query,
            {
                "$set": update_data,
                "$setOnInsert": insert_data
            },
            upsert=True
        )
        print(f"✅ Đã lưu: {data['title']}")

    except Exception as e:
        print(f"❌ Lỗi Database: {e}")

# ... (Phần save_match_to_db giữ nguyên như cũ)
try:
    matches_col.create_index("api_id", unique=True)
except:
    pass

def save_match_to_db(match_data):
    try:
        goals_data = []
        if "goals" in match_data:
            goals_data = match_data["goals"]

        referees = []
        if "referees" in match_data:
            referees = [ref.get("name") for ref in match_data["referees"]]

        match_doc = {
            "api_id": match_data["id"],
            "competition": match_data["competition"]["name"],
            "season": match_data["season"]["startDate"][:4],
            "home_team": {
                "name": match_data["homeTeam"]["name"],
                "logo": match_data["homeTeam"].get("crest"),
                "short_name": match_data["homeTeam"].get("tla")
            },
            "away_team": {
                "name": match_data["awayTeam"]["name"],
                "logo": match_data["awayTeam"].get("crest"),
                "short_name": match_data["awayTeam"].get("tla")
            },
            "score": {
                "home": match_data["score"]["fullTime"]["home"],
                "away": match_data["score"]["fullTime"]["away"]
            },
            "match_date": datetime.strptime(match_data["utcDate"], "%Y-%m-%dT%H:%M:%SZ"),
            "status": match_data["status"],
            "goals": goals_data,
            "referees": referees,
            "updatedAt": datetime.now()
        }

        matches_col.update_one(
            {"api_id": match_doc["api_id"]},
            {"$set": match_doc},
            upsert=True
        )
        print(f"⚽ Đã lưu: {match_doc['home_team']['name']} vs {match_doc['away_team']['name']}")

    except Exception as e:
        print(f"❌ Lỗi lưu Match: {e}")