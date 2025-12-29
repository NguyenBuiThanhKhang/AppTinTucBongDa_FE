import requests
from bs4 import BeautifulSoup
import time
import random

from config import BASE_URL, HEADERS, SEED_CATEGORIES
from utils import parse_time
from database import save_article_to_db

def get_article_detail(url, category_default):
    try:
        if not url.startswith("http"):
            url = BASE_URL + url

        res = requests.get(url, headers=HEADERS, timeout=10)
        if res.status_code != 200: return None

        soup = BeautifulSoup(res.text, "html.parser")

        # --- 1. LOGIC MỚI: ƯU TIÊN META TAG (CHUẨN XÁC NHẤT) ---
        # Mục tiêu: Lấy chính xác category mà báo đã định nghĩa cho Google đọc
        real_category_name = None

        # Cách 1: Lấy từ meta property="article:section" (Chuẩn Facebook/SEO)
        meta_cat = soup.find("meta", property="article:section")

        # Cách 2: Lấy từ meta itemprop="articleSection" (Chuẩn Google Schema)
        if not meta_cat:
            meta_cat = soup.find("meta", attrs={"itemprop": "articleSection"})

        if meta_cat and meta_cat.get("content"):
            real_category_name = meta_cat["content"].strip()
            # print(f"   -> Detect Cat (Meta): {real_category_name}")

        else:
            # --- FALLBACK: NẾU KHÔNG CÓ META THÌ MỚI DÙNG BREADCRUMB ---
            try:
                # Thử nhiều selector khác nhau
                breadcrumb = soup.select(".breadcrumb li a")
                if not breadcrumb: breadcrumb = soup.select(".box-header-of-category a")
                if not breadcrumb: breadcrumb = soup.select("ul.breadcrumb li a")

                if breadcrumb:
                    # Lấy phần tử cuối cùng
                    last_cate = breadcrumb[-1].text.strip()
                    if last_cate and "Trang chủ" not in last_cate:
                        real_category_name = last_cate
                        # print(f"   -> Detect Cat (Breadcrumb): {real_category_name}")
            except Exception as e:
                pass

        # -----------------------------------------------------------

        # 2. Lấy Content
        content_div = soup.find("div", id="postContent")
        if not content_div:
            content_div = soup.select_one(".article-body")

        if not content_div:
            return None

            # Clean rác
        for tag in content_div.find_all(["script", "iframe", "style", "ins", "div", "section"], recursive=True):
            if tag.name == 'div' and tag.find('img'): continue
            tag.decompose()

        content_html = content_div.decode_contents()

        # 3. Metadata khác
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

        slug_url = url.split("/")[-1].replace(".html", "")

        return {
            "title": title,
            "slug": slug_url,
            "sapo": sapo,
            "content_html": content_html,
            "thumbnail": thumbnail,
            "author": author,
            "published_at": published_at,
            "category_name": real_category_name,
            "parent_slug": category_default,
            "source_url": url
        }

    except Exception as e:
        print(f"❌ Lỗi chi tiết {url}: {e}")
        return None

def crawl_category_page(cat_slug):
    full_url = f"{BASE_URL}/{cat_slug}"
    print(f"🚀 Đang cào danh mục: {full_url}")

    try:
        res = requests.get(full_url, headers=HEADERS)
        soup = BeautifulSoup(res.text, "html.parser")

        links = set()
        for a in soup.select("a[href$='.html']"):
            href = a.get('href')
            if href and ("bongdaplus.vn" not in href or href.startswith("/")):
                links.add(href)

        print(f"   -> Tìm thấy {len(links)} bài viết.")

        count = 0
        for link in list(links)[:30]:
            detail = get_article_detail(link, cat_slug)
            if detail:
                save_article_to_db(detail)
                count += 1
            time.sleep(random.uniform(0.5, 1.5))

    except Exception as e:
        print(f"❌ Lỗi category {cat_slug}: {e}")

if __name__ == "__main__":
    for cat in SEED_CATEGORIES:
        crawl_category_page(cat)