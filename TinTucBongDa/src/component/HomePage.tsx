import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import './css/HomePage.css';
import { timeAgo } from '../utils/dateUtils';

interface Article {
    _id: string;
    title: string;
    slug: string;
    sapo: string;
    thumbnail: string;
    author: string;
    createdAt: string;
    category: { name: string; slug: string };
    source_url?: string;
}

const HomePage = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axiosClient.get('/articles/latest');
                setArticles(res as unknown as Article[]);
            } catch (error) {
                console.error("Lỗi tải bài viết:", error);
            }
        };

        fetchArticles();
    }, []);

    const tinNoiBat = articles[0];
    const tinLienQuan = articles.slice(1, 4);
    const tinMoiNhat = articles.slice(4);

    return (
        <div className="homepage-container">
            {/* Tin chinh */}
            <div className="left-column">
                {tinNoiBat && (
                    <div className="highlight-news">
                        <Link to={`/bai-viet/${tinNoiBat.slug}`}>
                            <img
                                src={tinNoiBat.thumbnail || "https://via.placeholder.com/700x400"}
                                alt={tinNoiBat.title}
                                className="highlight-img"
                                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/700x400"} // Fallback nếu ảnh lỗi
                            />
                        </Link>
                        <h1 className="highlight-title">
                            <Link to={`/bai-viet/${tinNoiBat.slug}`}>{tinNoiBat.title}</Link>
                        </h1>
                        <div className="meta-info">
                            <span className="source red">{tinNoiBat.author || "Bongdaplus"}</span>
                            <span className="time">{timeAgo(tinNoiBat.createdAt)}</span>
                            <p className="sapo-text">{tinNoiBat.sapo}</p>
                        </div>
                    </div>
                )}
                {/* Tin lquan */}
                <div className="related-news-row">
                    {tinLienQuan.map(item => (
                        <div key={item._id} className="related-item">
                            <Link to={`/bai-viet/${item.slug}`}>
                                <img
                                    src={item.thumbnail || "https://via.placeholder.com/300x200"}
                                    alt={item.title}
                                />
                            </Link>
                            <h3>
                                <Link to={`/bai-viet/${item.slug}`}>{item.title}</Link>
                            </h3>
                            <div className="meta-info">
                                <span className="source bold">
                                    {item.category?.name || "Tin tức"}
                                </span>
                                <span className="time">{timeAgo(item.createdAt)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tin moi */}
            <div className="right-column">
                <div className="sidebar-title">TIN MỚI NHẤT</div>
                {tinMoiNhat.map(item => (
                    <div key={item._id} className="sidebar-item">
                        <div className="sidebar-img">
                            <Link to={`/bai-viet/${item.slug}`}>
                                <img
                                    src={item.thumbnail || "https://via.placeholder.com/100x70"}
                                    alt="thumb"
                                />
                            </Link>
                        </div>
                        {/* Chữ bên phải */}
                        <div className="sidebar-content">
                            <h4>
                                <Link to={`/bai-viet/${item.slug}`}>{item.title}</Link>
                            </h4>
                            <div className="meta-info-small">
                                <span className="source red">{item.category?.name}</span>
                                <span className="time">{timeAgo(item.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default HomePage;