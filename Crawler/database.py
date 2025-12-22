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