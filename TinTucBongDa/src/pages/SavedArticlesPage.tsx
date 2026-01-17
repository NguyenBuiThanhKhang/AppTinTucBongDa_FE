import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../api/userApi";
import "../scss/SavedArticlesPage.scss";

interface Article {
    _id: string;
    title: string;
    thumbnail?: string;
    sapo?: string;
}

function SavedArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedArticles = async () => {
            try {
                const response: any = await userApi.getSavedArticles();
                const data = response.data || response;
                
                if (data && data.data) {
                     setArticles(data.data);
                } else if (Array.isArray(data)) {
                     setArticles(data);
                }
            } catch (error) {
                console.error("Lỗi tải bài đã lưu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedArticles();
    }, []);

    if (loading) return <div className="loading-text">Đang tải tủ báo...</div>;

    return (
        <div className="saved-articles-container">
            <h2 className="page-header">
                <i className="fa-solid fa-bookmark"></i>
                Bài viết đã lưu ({articles.length})
            </h2>

            {articles.length === 0 ? (
                <div className="empty-state">
                    <p>Bạn chưa lưu bài viết nào.</p>
                    <Link to="/">Quay về trang chủ</Link>
                </div>
            ) : (
                <div className="list-articles">
                    {articles.map((item) => (
                        <Link to={`/newspaperDetail/${item._id}`}>
                            <div key={item._id} className="article-item">
                                <div className="article-thumb">
                                    <img 
                                        src={item.thumbnail || "https://via.placeholder.com/150"} 
                                        alt={item.title} 
                                    />
                                </div>

                                <div className="article-info">
                                    <h3>
                                        {item.title}
                                    </h3>
                                    <p>
                                        {item.sapo 
                                            ? item.sapo.substring(0, 200) + "..." 
                                            : "Xem chi tiết bài viết..."}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedArticlesPage;