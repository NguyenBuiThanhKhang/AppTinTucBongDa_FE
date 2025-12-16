import pymongo
from datetime import datetime
from config import MONGO_URI, DB_NAME, COLLECTION_NAME

client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
col = db[COLLECTION_NAME]

col.create_index("article_url", unique=True)
col.create_index("slug")

def save_article(article):
    article["updated_at"] = datetime.utcnow()
    col.update_one(
        {"article_url": article["article_url"]},
        {"$set": article},
        upsert=True
    )
