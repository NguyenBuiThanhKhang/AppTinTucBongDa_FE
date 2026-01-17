import React from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../utils/dateUtils';
import '../scss/LatestNews.scss';

export interface ArticleItem {
    _id: string;
    title: string;
    thumbnail: string;
    createdAt: string;
    category: { name: string; slug?: string };
}

interface LatestNewsProps {
    articles: ArticleItem[]; 
    title?: string;
}

const LatestNews: React.FC<LatestNewsProps> = ({ articles, title = "TIN MỚI NHẤT" }) => {
    return (
        <div className="latest-news-widget">
            <div className="sidebar-title">{title}</div>
            {articles.map(item => (
                <div key={item._id} className="sidebar-item">
                    <div className="sidebar-img">
                        <Link to={`/newspaperDetail/${item._id}`}>
                            <img
                                src={item.thumbnail || "https://via.placeholder.com/100x70"}
                                alt="thumb"
                                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/100x70"}
                            />
                        </Link>
                    </div>
                    <div className="sidebar-content">
                        <h4>
                            <Link to={`/newspaperDetail/${item._id}`}>{item.title}</Link>
                        </h4>
                        <div className="meta-info-small">
                            <span className="source red">{item.category?.name}</span>
                            <span className="time">{timeAgo(item.createdAt)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LatestNews;