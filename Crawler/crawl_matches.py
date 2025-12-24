# crawl_matches.py
import requests
import time
from config import FOOTBALL_API_URL, FOOTBALL_HEADERS, COMPETITIONS_ID
from database import save_match_to_db


def fetch_finished_matches(comp_id):
    """
    Lấy lịch sử đấu của một giải cụ thể
    """
    # Endpoint: /competitions/{id}/matches?status=FINISHED
    # API Free giới hạn request, nên chỉ lấy mùa hiện tại mặc định
    url = f"{FOOTBALL_API_URL}/competitions/{comp_id}/matches"

    params = {
        "status": "FINISHED"  # Chỉ lấy trận đã đá xong
        # "dateFrom": "2024-01-01", # Có thể lọc theo ngày nếu muốn
        # "dateTo": "2024-01-31"
    }

    try:
        print(f"--- Đang tải dữ liệu giải ID: {comp_id} ---")
        res = requests.get(url, headers=FOOTBALL_HEADERS, params=params)

        if res.status_code == 200:
            data = res.json()
            matches = data.get("matches", [])
            print(f"✅ Tìm thấy {len(matches)} trận đấu đã kết thúc.")

            for match in matches:
                save_match_to_db(match)
        else:
            print(f"⚠️ Lỗi API ({res.status_code}): {res.text}")

    except Exception as e:
        print(f"❌ Lỗi connection: {e}")


if __name__ == "__main__":
    # Duyệt qua danh sách giải đấu trong config
    for comp_id, comp_name in COMPETITIONS_ID.items():
        print(f"🏆 Bắt đầu cào: {comp_name}")
        fetch_finished_matches(comp_id)

        # QUAN TRỌNG: API Free chỉ cho 10 request/phút.
        # Mỗi lần gọi request xong nghỉ 7 giây để an toàn (60s / 10req = 6s)
        print("⏳ Nghỉ 7 giây để tránh khóa API...")
        time.sleep(7)