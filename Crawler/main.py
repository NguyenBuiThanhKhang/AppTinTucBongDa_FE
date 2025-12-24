import requests
from bs4 import BeautifulSoup
import time
import random

from config import BASE_URL, HEADERS, SEED_CATEGORIES
from utils import parse_time, slugify
from database import save_article_to_db

def get_article_detail(url, category_default):
    try:
        if not url.startswith("http"):
            url = BASE_URL + url

        res = requests.get(url, headers=HEADERS, timeout=10)
        if res.status_code != 200: return None

        soup = BeautifulSoup(res.text, "html.parser")

        # 1. Lấy Content (Logic An toàn: Thử id cũ và class mới)
        content_div = soup.find("div", id="postContent")
        if not content_div:
            content_div = soup.select_one(".article-body")

        if not content_div:
            return None # Bỏ qua nếu không lấy được nội dung

        # Clean rác (Code cũ của bạn rất tốt đoạn này)
        for tag in content_div.find_all(["script", "iframe", "style", "ins", "div", "section"], recursive=True):
            # Giữ lại div ảnh
            if tag.name == 'div' and tag.find('img'): continue
            tag.decompose()

        content_html = content_div.decode_contents()

        # 2. Các thông tin khác
        title_tag = soup.select_one("h1")
        title = title_tag.text.strip() if title_tag else "No Title"

        sapo_tag = soup.select_one(".sapo")
        sapo = sapo_tag.text.strip() if sapo_tag else ""

        og = soup.find("meta", property="og:image")
        thumbnail = og["content"] if og else ""

        author_tag = soup.find("p", class_="author") or soup.find("div", class_="author")
        author = author_tag.get_text(strip=True) if author_tag else "Bongdaplus"

        time_tag = soup.find("span", class_="time") or soup.find("div", class_="time")
        published_at = parse_time(time_tag.get_text(strip=True)) if time_tag else None

        # Lấy slug từ URL cho chuẩn SEO
        slug_url = url.split("/")[-1].replace(".html", "")

        return {
            "title": title,
            "slug": slug_url,
            "sapo": sapo,
            "content_html": content_html,
            "thumbnail": thumbnail,
            "author": author,
            "published_at": published_at,
            "category_name": category_default, # Dùng tên category từ vòng lặp cha
            "source_url": url
        }

    except Exception as e:
        print(f"Lỗi chi tiết {url}: {e}")
        return None

def crawl_category_page(cat_slug):
    full_url = f"{BASE_URL}/{cat_slug}"
    print(f"🚀 Đang cào danh mục: {full_url}")

    try:
        res = requests.get(full_url, headers=HEADERS)
        soup = BeautifulSoup(res.text, "html.parser")

        # Lấy danh sách link bài viết
        # Logic: Lấy thẻ a có href chứa .html
        links = set()
        for a in soup.select("a[href$='.html']"):
            href = a.get('href')
            if href and "bongdaplus.vn" not in href or href.startswith("/"):
                links.add(href)

        print(f"   -> Tìm thấy {len(links)} bài viết.")

        count = 0
        for link in list(links)[:10]: # Test 10 bài mỗi danh mục
            detail = get_article_detail(link, cat_slug) # Truyền slug danh mục vào làm tên luôn
            if detail:
                save_article_to_db(detail)
                count += 1
            time.sleep(random.uniform(0.5, 1.5)) # Delay nhẹ

    except Exception as e:
        print(f"Lỗi category {cat_slug}: {e}")

if __name__ == "__main__":
    for cat in SEED_CATEGORIES:
        crawl_category_page(cat)