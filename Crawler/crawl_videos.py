from youtubesearchpython import VideosSearch
import pymongo
import os
from dotenv import load_dotenv
from datetime import datetime

# 1. Kết nối DB
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = pymongo.MongoClient(MONGO_URI)
db = client.get_database("SportNewsFE") 
video_collection = db["videos"]
category_collection = db["categories"]

EXCLUDE_SLUGS = ["trang-chu", "lien-he", "gioi-thieu", "tin-moi-nhat"]

def crawl_youtube_videos():
    total_added = 0
    
    # 2. Lấy danh sách chuyên mục
    categories = list(category_collection.find({"slug": {"$nin": EXCLUDE_SLUGS}}, {"name": 1, "slug": 1}))
    
    for cat in categories:
        cat_name = cat.get("name")
        cat_slug = cat.get("slug")
        
        query = f"highlight bóng đá {cat_name} mới nhất"
        
        try:
            videosSearch = VideosSearch(query, limit=5, language='vi', region='VN')
            results = videosSearch.result()

            if 'result' in results:
                for vid in results['result']:
                    title = vid['title']
                    link = vid['link']
                                        
                    duration = vid.get('duration') # VD: "10:05"               
                    thumbnails = vid.get('thumbnails', [])
                    thumbnail_url = thumbnails[0]['url'] if thumbnails else ""
                    desc_list = vid.get('descriptionSnippet', [])
                    description = "".join([item.get('text', '') for item in desc_list]) if desc_list else ""

                    if video_collection.find_one({"link": link}):
                        continue

                    video_data = {
                        "title": title,
                        "link": link,
                        "thumbnail": thumbnail_url,
                        "duration": duration,       
                        "description": description,
                        "category": cat_slug,       
                        "createdAt": datetime.now()
                    }
                    
                    video_collection.insert_one(video_data)
                    total_added += 1
                    
        except Exception as e:
            continue

if __name__ == "__main__":
    crawl_youtube_videos()