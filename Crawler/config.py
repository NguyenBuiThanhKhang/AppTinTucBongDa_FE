import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://bongdaplus.vn"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

CATEGORY_MAPPING = {
    "bong-da-anh": "Anh",
    "bong-da-tay-ban-nha": "Tây Ban Nha",
    "champions-league-cup-c1": "Champions League",
    "bong-da-viet-nam": "Việt Nam",
    "bong-da-phap": "Pháp",
    "bong-da-the-gioi": "Thế giới",
    "the-thao": "Thể thao",
    "bong-da-duc": "Đức",
    "bong-da-y": "Ý"
}

SEED_CATEGORIES = list(CATEGORY_MAPPING.keys())
FOOTBALL_API_KEY = os.getenv("FOOTBALL_DATA_API_KEY")
FOOTBALL_API_URL = "https://api.football-data.org/v4"

FOOTBALL_HEADERS = {
    "X-Auth-Token": FOOTBALL_API_KEY
}

# ID các giải đấu (Free Tier hỗ trợ các giải này)
# 2021: Premier League, 2014: La Liga, 2001: Champions League, etc.
COMPETITIONS_ID = {
    2021: "Premier League",
    # 2014: "La Liga",
    # 2001: "UEFA Champions League",
    # 2002: "Bundesliga",
    # 2019: "Serie A",
    # 2015: "Ligue 1"
}