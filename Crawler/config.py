import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://bongdaplus.vn"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Các danh mục muốn cào
SEED_CATEGORIES = [
    "bong-da-anh",
    "bong-da-tay-ban-nha",
    "champions-league-cup-c1",
    "bong-da-viet-nam"
]