import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
from utils import slugify

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database("SportNewsFE")
articles_col = db["articles"]
categories_col = db["categories"]
matches_col = db["matches"]
# Tạo index để tránh trùng bài
try:
    articles_col.create_index("source_url", unique=True)
    articles_col.create_index("slug", unique=True)
except:
    pass

def get_or_create_category(cat_name):
    """
    Tìm Category ID dựa vào tên. Nếu chưa có thì tạo mới.
    Đây là mấu chốt để map với Schema của Node.js
    """
    if not cat_name: return None

    clean_name = cat_name.strip()
    # Tìm xem có chưa
    existing = categories_col.find_one({"name": clean_name})
    if existing:
        return existing["_id"]

    # Chưa có thì tạo
    new_cat = {
        "name": clean_name,
        "slug": slugify(clean_name),
        "parent": None,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    }
    result = categories_col.insert_one(new_cat)
    print(f"--> Tạo Category mới: {clean_name}")
    return result.inserted_id

def save_article_to_db(data):
    try:
        # Lấy ID danh mục (Object ID)
        cat_id = get_or_create_category(data.get("category_name"))

        # Mapping dữ liệu sang chuẩn Schema Phase 1
        article_doc = {
            "title": data["title"],
            "slug": data["slug"], # Slug từ URL hoặc Title
            "sapo": data["sapo"],
            "content": data["content_html"],
            "thumbnail": data["thumbnail"],
            "author": data["author"],
            "original_published_at": data["published_at"],
            "category": cat_id, # Lưu ObjectId
            "source_url": data["source_url"], # Đổi từ article_url -> source_url

            # Metadata
            "$setOnInsert": {"createdAt": datetime.now(), "views": 0},
            "updatedAt": datetime.now()
        }

        # Upsert: Có rồi thì update, chưa có thì insert
        query = {"source_url": data["source_url"]}
        articles_col.update_one(query, {"$set": article_doc}, upsert=True)
        print(f"✅ Đã lưu: {data['title']}")

    except Exception as e:
        print(f"❌ Lỗi Database: {e}")


try:
    matches_col.create_index("api_id", unique=True)
except:
    pass
def save_match_to_db(match_data):
    try:
        # --- CỐ GẮNG LẤY THÔNG TIN NGƯỜI GHI BÀN (NẾU CÓ) ---
        # Lưu ý: API Free đôi khi không trả về cái này ở endpoint list
        goals_data = []
        if "goals" in match_data:
            goals_data = match_data["goals"]  # Danh sách ai ghi bàn, phút bao nhiêu

        # --- LẤY TRỌNG TÀI (NẾU CẦN) ---
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

            # --- THÊM MỚI ---
            "goals": goals_data,  # Để hiển thị diễn biến ghi bàn
            "referees": referees,  # Trọng tài bắt chính
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