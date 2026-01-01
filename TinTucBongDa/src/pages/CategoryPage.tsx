import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../scss/CategoryPage.scss';
import { timeAgo } from '../utils/dateUtils'; 
import CategorySkeleton from '../component/CategorySkeleton';

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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 13; 

    useEffect(() => {
        setPage(1);
    }, [slug]);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/articles/category/${slug}`, {
                    params: {
                        page: page,
                        limit: LIMIT
                    }
                });

                if (res.data && res.data.data) {
                    setData(res.data.data);
                    
                    if (res.data.pagination) {
                        setTotalPages(res.data.pagination.totalPages);
                    }
                }

            } catch (error) {
                console.error("Lỗi tải trang:", error);
                setData(null);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };

        fetchData();
    }, [slug, page]); 

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const isSwitchingCategory = data && data.category.slug !== slug;

    if (loading || isSwitchingCategory) {
        return <CategorySkeleton />;
    }

    if (!data || data.articles.length === 0) {
        return <div className="error-state" style={{padding: '50px', textAlign: 'center', fontSize: '18px'}}>Chưa có bài viết nào trong mục này!</div>;
    }

    const heroArticle = data.articles[0];
    const listArticles = data.articles.slice(1);

    return (
        <div className="container category-page" style={{ marginTop: '20px' }}>
            
            {/* Breadcrumb */}
            <div className="cat-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span className="sep">»</span>
                <span>{data.category.name}</span>
            </div>

            {/* Header Danh mục */}
            <div className="cat-header">
                <h1 className="cat-title">{data.category.name}</h1>
                <div className="cat-line"></div>
                <div className="cat-plus-icon">+</div>
            </div>

            {/* Hero Section */}
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

            {/* Grid List */}
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

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="pagination-container">
                    <button 
                        className={`page-btn prev ${page === 1 ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        &laquo; Trước
                    </button>

                    <div className="page-numbers">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <button 
                                    key={pageNum}
                                    className={`page-btn number ${page === pageNum ? 'active' : ''}`}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button 
                        className={`page-btn next ${page === totalPages ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Sau &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;