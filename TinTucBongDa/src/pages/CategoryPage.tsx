import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/CategoryPage.scss';
import { timeAgo } from '../utils/dateUtils'; 

export interface Article {
    _id: string;
    title: string;
    slug: string;
    sapo: string;
    thumbnail: string;
    original_published_at?: string;
    author?: string;
    createdAt?: string;
}

export interface CategoryData {
    category: {
        _id: string;
        name: string;
        slug: string;
    };
    articles: Article[];
}
const CategoryPage = () => {
    const { slug } = useParams();
    const [data, setData] = useState<CategoryData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/articles/category/${slug}`);
                setData(res.data.data);
            } catch (error) {
                console.error("Lỗi tải trang:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

    const isSwitchingCategory = data && data.category.slug !== slug;

    if (loading || isSwitchingCategory) {
        return (
            <div className="container category-page" style={{ marginTop: '20px' }}>
                <div className="skeleton text-line short" style={{ height: '20px', width: '200px', marginBottom: '10px' }}></div>
                <div className="skeleton text-line short" style={{ height: '40px', width: '300px', marginBottom: '30px' }}></div>

                <div className="hero-skeleton">
                    <div className="skeleton hero-skeleton-img"></div>
                    <div className="hero-skeleton-text">
                        <div className="skeleton text-line" style={{ height: '30px' }}></div>
                        <div className="skeleton text-line"></div>
                        <div className="skeleton text-line"></div>
                        <div className="skeleton text-line short"></div>
                    </div>
                </div>

                <div className="list-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="card-skeleton">
                            <div className="skeleton card-skeleton-img"></div>
                            <div className="skeleton text-line"></div>
                            <div className="skeleton text-line short"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.articles.length === 0) {
        return <div className="error-state" style={{padding: '20px', textAlign: 'center'}}>Chưa có bài viết nào trong mục này!</div>;
    }

    const heroArticle = data.articles[0];
    const listArticles = data.articles.slice(1);

    return (
        <div className="container category-page" style={{ marginTop: '20px' }}>
            
            <div className="cat-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span className="sep">»</span>
                <span>{data.category.name}</span>
            </div>

            <div className="cat-header">
                <h1 className="cat-title">{data.category.name}</h1>
                <div className="cat-line"></div>
                <div className="cat-plus-icon">+</div>
            </div>

            {heroArticle && (
                <div className="hero-section">
                    <div className="hero-image">
                        <Link to={`/bai-viet/${heroArticle.slug}`}>
                            <img src={heroArticle.thumbnail} alt={heroArticle.title} />
                        </Link>
                    </div>
                    <div className="hero-content">
                        <h2>
                            <Link to={`/bai-viet/${heroArticle.slug}`} className="hero-title-link">
                                {heroArticle.title}
                            </Link>
                        </h2>
                        
                        <div className="meta-info">
                            <span className="source red">{heroArticle.author || "Bongdaplus"}</span>
                            <span className="time">{timeAgo(heroArticle.original_published_at || heroArticle.createdAt)}</span>
                        </div>

                        <p className="hero-sapo">{heroArticle.sapo}</p>
                    </div>
                </div>
            )}

            <div className="list-grid">
                {listArticles.map((article) => (
                    <div key={article._id} className="article-card">
                        <Link to={`/bai-viet/${article.slug}`} className="card-thumb-link">
                            <img src={article.thumbnail} alt={article.title} />
                        </Link>
                        <div className="card-body">
                            <h3 className="card-title">
                                <Link to={`/bai-viet/${article.slug}`}>
                                    {article.title}
                                </Link>
                            </h3>
                            
                            <div className="meta-info-small">
                                <span className="source">{article.author || "Bongdaplus"}</span>
                                <span className="dot">•</span>
                                <span className="time">{timeAgo(article.original_published_at || article.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;