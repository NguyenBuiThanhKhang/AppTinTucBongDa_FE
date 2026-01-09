import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';
import './SpecialNews.scss';

interface SpecialArticle {
    _id: string;
    title: string;
    slug: string;
    thumbnail: string;
    tag: string;
}

const SpecialNews = () => {
    const [articles, setArticles] = useState<SpecialArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpecialNews = async () => {
            try {
                const res: any = await axiosClient.get('/articles/special');
                if (res.data) {
                    setArticles(res.data);
                }
            } catch (error) {
                console.error("Lỗi tải tin đặc biệt:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecialNews();
    }, []);

    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 4;

    const handleNext = () => {
        setStartIndex((prev) =>
            (prev + itemsPerPage < articles.length) ? prev + 1 : 0
        );
    };

    const handlePrev = () => {
        setStartIndex((prev) =>
            (prev > 0) ? prev - 1 : Math.max(0, articles.length - itemsPerPage)
        );
    };

    const visibleArticles = [];
    if (articles.length > 0) {
        for (let i = 0; i < itemsPerPage; i++) {
            let index = (startIndex + i) % articles.length;
            visibleArticles.push(articles[index]);
        }
    }

    if (!loading && articles.length === 0) return null;

    return (
        <div className="special-news-section">
            <div className="special-container">

                <div className="section-header">
                    <span className="line"></span>
                    <h2 className="header-title">ĐẶC BIỆT</h2>
                    <span className="line"></span>
                    <div className="plus-icon">+</div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải...</div>
                ) : (
                    <div className="carousel-wrapper">
                        <button className="nav-btn prev-btn" onClick={handlePrev}>
                            <i className="fa fa-angle-left"></i>
                        </button>

                        <div className="special-grid">
                            {visibleArticles.map((item) => (
                                <div key={item._id} className="special-card fade-in">
                                    <Link to={`/bai-viet/${item.slug}`} className="card-link">
                                        <div className="card-image">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/300x200"}
                                            />
                                            <span className="tag-label">{item.tag || "HOT"}</span>
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-title">{item.title}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <button className="nav-btn next-btn" onClick={handleNext}>
                            <i className="fa fa-angle-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecialNews;