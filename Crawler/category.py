import requests
from bs4 import BeautifulSoup
from config import BASE_URL, HEADERS

def discover_subcategories(seed):
    url = f"{BASE_URL}/{seed}"
    res = requests.get(url, headers=HEADERS, timeout=10)
    soup = BeautifulSoup(res.text, "html.parser")

    subs = set()
    for a in soup.select("a[href^='/" + seed + "']"):
        href = a.get("href")
        if href and href.count("/") == 2:
            subs.add(href.strip("/"))

    return list(subs) or [seed]
