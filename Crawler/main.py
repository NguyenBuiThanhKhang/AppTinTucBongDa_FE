import os
import random

import requests
from bs4 import BeautifulSoup
import pymongo
from datetime import datetime
import time
import re
import unicodedata

from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")


def save_to_mongodb(data_list):
    if not data_list:
        print("Không có dữ liệu!")
        return

    try:
        client = pymongo.MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        new_count = 0
        updated_count = 0

        for item in data_list:
            filter_query = {'article_url': item['article_url']}
            update_query = {"$set": item}

            result = collection.update_one(filter_query, update_query, upsert=True)

            if result.upserted_id:
                new_count += 1
            else:
                updated_count += 1

        print(f"Done!")
        print(f"Thêm mới: {new_count} bài")
        print(f"Cập nhật: {updated_count} bài")

        client.close()

    except Exception as e:
        print(f"Lỗi khi lưu MongoDB: {str(e)}")


def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"\s+", "-", text).strip("-")
    return text


def parse_published_time(raw_time):
    try:
        return datetime.strptime(raw_time, "%d/%m/%Y %H:%M")
    except:
        return datetime.now()


def get_article_detail(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }

        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        content_div = soup.find("div", id="postContent")
        if not content_div:
            return None

        for tag in content_div.find_all(["script", "iframe", "style", "ins"]):
            tag.decompose()

        for div in content_div.find_all("div", class_=["embedBox", "adbro", "mwgwidget"]):
            div.decompose()

        content_html = content_div.decode_contents()

        content_text = content_div.get_text(" ", strip=True)

        # ---------- Thumbnail ----------
        thumbnail = ""
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            thumbnail = og_image["content"]
        else:
            first_img = content_div.find("img")
            if first_img and first_img.get("src"):
                thumbnail = first_img["src"]

        # ---------- Author ----------
        author = "Bongdaplus"
        author_div = soup.find("p", class_="author")
        if author_div:
            author = author_div.get_text(strip=True)

        # ---------- Published time ----------
        published_at = datetime.now()
        time_span = soup.find("span", class_="time")
        if time_span:
            published_at = parse_published_time(time_span.get_text(strip=True))

        return {
            "content_html": content_html,
            "content_text": content_text,
            "author": author,
            "published_at": published_at,
            "thumbnail": thumbnail
        }

    except Exception as e:
        print(f"Lỗi khi lấy chi tiết {url}: {e}")
        return None


def crawl_website():
    base_url = "https://bongdaplus.vn"
    target_url = "https://bongdaplus.vn/bong-da-viet-nam"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(target_url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.content, "html.parser")

    links = soup.select("ul li a.title") or soup.select("h3 a")
    articles = []
    count = 0

    for link in links:
        if count >= 10:
            break

        href = link.get("href")
        title = link.get("title") or link.get_text(strip=True)

        if not href or not title:
            continue

        article_url = href if href.startswith("http") else base_url + href
        detail = get_article_detail(article_url)
        if not detail:
            continue

        article = {
            "title": title,
            "slug": slugify(title),
            "summary": title,
            "content_html": detail["content_html"],
            "content_text": detail["content_text"],
            "thumbnail": detail["thumbnail"],
            "author": detail["author"],
            "category": "Bóng đá Việt Nam",
            "source": "bongdaplus",
            "article_url": article_url,
            "published_at": detail["published_at"],
            "created_at": datetime.now(),
            "views": 0
        }

        articles.append(article)
        count += 1
        time.sleep(random.uniform(1, 2))

    return articles


if __name__ == "__main__":
    data = crawl_website()

    if data:
        save_to_mongodb(data)
