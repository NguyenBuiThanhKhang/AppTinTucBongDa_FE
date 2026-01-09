import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient.ts';
import '../component/css/HomePage.scss';
import { timeAgo } from '../utils/dateUtils.ts';
import MultimediaSection from '../component/Multimedia.tsx';
import HotTag from '../component/HotTag.tsx';
import SpecialNews from '../component/SpeacialNews.tsx';

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
        <div className="homepage-main">
            <div className="homepage-container">
                
                <div className="left-column">
                    {tinNoiBat && (
                        <div className="highlight-news">
                            <Link to={`/bai-viet/${tinNoiBat.slug}`}>
                                <img
                                    src={tinNoiBat.thumbnail || "https://via.placeholder.com/700x400"}
                                    alt={tinNoiBat.title}
                                    className="highlight-img"
                                    onError={(e) => e.currentTarget.src = "https://via.placeholder.com/700x400"}
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

            <MultimediaSection />

            <div className="homepage-container bottom-section">
                
                <div className="left-column">
                    <SpecialNews />
                </div>

                <div className="right-column">
                    <HotTag />
                </div>
            </div>

        </div>
    );
};

export default HomePage;