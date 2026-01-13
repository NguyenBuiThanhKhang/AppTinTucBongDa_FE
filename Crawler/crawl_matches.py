# crawl_matches.py
import requests
import time
from config import FOOTBALL_API_URL, FOOTBALL_HEADERS, COMPETITIONS_ID
from database import save_match_to_db


def fetch_matches(comp_id, status, limit=5):
    url = f"{FOOTBALL_API_URL}/competitions/{comp_id}/matches"

    params = {
        "status": status
    }

    try:
        res = requests.get(url, headers=FOOTBALL_HEADERS, params=params)

        if res.status_code == 200:
            data = res.json()
            matches = data.get("matches", [])[:limit]

            for match in matches:
                save_match_to_db(match)
        else:
            print(f"Lỗi API ({res.status_code}): {res.text}")

    except Exception as e:
        print("Lỗi:", e)



if __name__ == "__main__":
    print("🏆 Bắt đầu cào")

    fetch_matches(2021, "SCHEDULED", 5)

    print("⏳ Nghỉ 7 giây để tránh khóa API...")
    time.sleep(7)

    # fetch_matches(2021, "FINISHED", 5)
