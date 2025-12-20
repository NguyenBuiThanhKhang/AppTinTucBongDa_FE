import requests
from bs4 import BeautifulSoup
from datetime import datetime
from config import HEADERS
from utils import parse_time

def get_article_detail(url):
    res = requests.get(url, headers=HEADERS, timeout=15)
    soup = BeautifulSoup(res.text, "html.parser")

    content_div = soup.find("div", id="postContent")
    if not content_div:
        return None

    for tag in content_div.find_all(["script", "iframe", "style", "ins", "div"], recursive=True):
        if tag.name != "p":
            tag.decompose()

    content_html = content_div.decode_contents()
    content_text = content_div.get_text(" ", strip=True)

    og = soup.find("meta", property="og:image")
    thumbnail = og["content"] if og else ""

    author = "Bongdaplus"
    a = soup.find("p", class_="author")
    if a:
        author = a.get_text(strip=True)

    published = datetime.utcnow()
    t = soup.find("span", class_="time")
    if t:
        published = parse_time(t.get_text(strip=True))

    return {
        "content_html": content_html,
        "content_text": content_text,
        "thumbnail": thumbnail,
        "author": author,
        "published_at": published
    }
