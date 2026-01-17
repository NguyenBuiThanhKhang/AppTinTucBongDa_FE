import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import './css/HomePage.scss';
import { timeAgo } from '../utils/dateUtils';
import MultimediaSection from './Multimedia';
import HotTag from './HotTag';
import SpecialNews from './SpeacialNews';
import LatestNews from './LastestNews';

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
                            <Link to={`/newspaperDetail/${tinNoiBat._id}`}>
                                <img
                                    src={tinNoiBat.thumbnail || "https://via.placeholder.com/700x400"}
                                    alt={tinNoiBat.title}
                                    className="highlight-img"
                                    onError={(e) => e.currentTarget.src = "https://via.placeholder.com/700x400"}
                                />
                            </Link>
                            <h1 className="highlight-title">
                                <Link to={`/newspaperDetail/${tinNoiBat._id}`}>{tinNoiBat.title}</Link>
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
                                <Link to={`/newspaperDetail/${item._id}`}>
                                    <img
                                        src={item.thumbnail || "https://via.placeholder.com/300x200"}
                                        alt={item.title}
                                    />
                                </Link>
                                <h3>
                                    <Link to={`/newspaperDetail/${item._id}`}>{item.title}</Link>
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
                    <LatestNews articles={tinMoiNhat} />
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