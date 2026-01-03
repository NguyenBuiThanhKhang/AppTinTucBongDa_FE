import re
import unicodedata
from datetime import datetime

def slugify(text):
    if not text: return ""
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"\s+", "-", text).strip("-")

def parse_time(raw):
    if not raw: return datetime.now()
    try:
        clean_raw = raw.replace("ngày", "").strip()
        try:
            return datetime.strptime(clean_raw, "%H:%M %d-%m-%Y")
        except:
            return datetime.strptime(clean_raw, "%d/%m/%Y %H:%M")
    except:
        return datetime.now()