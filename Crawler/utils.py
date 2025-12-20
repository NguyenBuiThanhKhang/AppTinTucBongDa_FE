import re
import unicodedata
from datetime import datetime

def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"\s+", "-", text).strip("-")

def parse_time(raw):
    try:
        return datetime.strptime(raw, "%d/%m/%Y %H:%M")
    except:
        return datetime.utcnow()
