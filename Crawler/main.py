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

        category_name = None

        child_category = soup.find("meta", property="article:section")
        if not child_category:
            child_category = soup.find("meta", attrs={"itemprop": "articleSection"})

        if child_category and child_category.get("content"):
            category_name = child_category["content"].strip()

        else:
            try:
                breadcrumb = soup.select(".breadcrumb li a")
                if not breadcrumb: breadcrumb = soup.select(".box-header-of-category a")
                if not breadcrumb: breadcrumb = soup.select("ul.breadcrumb li a")

                if breadcrumb:
                    last_cate = breadcrumb[-1].text.strip()
                    if last_cate and "Trang chủ" not in last_cate:
                        category_name = last_cate
            except Exception as e:
                pass

        content_div = soup.find("div", id="postContent")
        if not content_div:
            content_div = soup.select_one(".article-body")

        if not content_div:
            return None

        for tag in content_div.find_all(["script", "iframe", "style", "ins", "div", "section"], recursive=True):
            if tag.name == 'div' and tag.find('img'): continue
            tag.decompose()

        content_html = content_div.decode_contents()

        title_tag = soup.select_one("h1")
        title = title_tag.text.strip() if title_tag else "No Title"

        sapo = ""
        sapo_tag = soup.find("div", class_="summary bdr") or soup.find("div", class_="summary")
        if sapo_tag:
            sapo = sapo_tag.get_text(separator=' ', strip=True)

        og = soup.find("meta", property="og:image")
        thumbnail = og["content"] if og else ""

        author = "Bongdaplus"
        editor_div = soup.find("div", class_="editor")
        if editor_div:
            author_link = editor_div.find("a")
            if author_link:
                author = author_link.get_text(strip=True)
            else:
                full_text = editor_div.get_text(strip=True)
                if "•" in full_text:
                    author = full_text.split("•")[0].strip()
                else:
                    author = full_text

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
            "category_name": category_name,
            "parent_slug": category_default,
            "source_url": url
        }

    except Exception as e:
        print(f"Lỗi chi tiết {url}: {e}")
        return None


def crawl_category_page(cat_slug):
    full_url = f"{BASE_URL}/{cat_slug}"
    try:
        res = requests.get(full_url, headers=HEADERS)
        soup = BeautifulSoup(res.text, "html.parser")

        links = set()
        for a in soup.select("a[href$='.html']"):
            href = a.get('href')
            if href and ("bongdaplus.vn" not in href or href.startswith("/")):
                links.add(href)
        count = 0
        for link in list(links)[:50]:
            detail = get_article_detail(link, cat_slug)
            if detail:
                save_article_to_db(detail)
                count += 1
            time.sleep(random.uniform(0.5, 1.5))

    except Exception as e:
        print(f"Lỗi category {cat_slug}: {e}")


if __name__ == "__main__":
    for cat in SEED_CATEGORIES:
        crawl_category_page(cat)
