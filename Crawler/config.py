import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://bongdaplus.vn"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "news_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "articles")

SEED_CATEGORIES = [
    "bong-da-viet-nam",
    "bong-da-anh",
    "bong-da-tay-ban-nha",
    "bong-da-y",
    "bong-da-the-gioi",
    "asian-cup",
    "champions-league-cup-c1",
    "europa-league",
    "sea-games"
]

PAGE_LIMIT = 5
