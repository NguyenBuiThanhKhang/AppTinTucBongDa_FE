import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.scss';
import { timeAgo } from '../utils/dateUtils';
import CategorySkeleton from '../components/common/CategorySkeleton';
import Pagination from '../components/common/Pagination';

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
                    params: { page: page, limit: LIMIT }
                });

                if (res.data && res.data.data) {
                    setData(res.data.data);
                    if (res.data.pagination) {
                        setTotalPages(res.data.pagination.totalPages);
                    } else if (res.data.data.pagination) {
                        setTotalPages(res.data.data.pagination.totalPages);
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
        setPage(newPage);
    };

    const isSwitchingCategory = data && data.category.slug !== slug;

    if (loading || isSwitchingCategory) return <CategorySkeleton />;

    if (!data || data.articles.length === 0) {
        return <div className="error-state" style={{ padding: '50px', textAlign: 'center' }}>Chưa có bài viết nào!</div>;
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
                        <Link to={`/newspaperDetail/${heroArticle._id}`}>
                            <img src={heroArticle.thumbnail} alt={heroArticle.title} />
                        </Link>
                    </div>
                    <div className="hero-content">
                        <h2>
                            <Link to={`/newspaperDetail/${heroArticle._id}`} className="hero-title-link">
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
                        <Link to={`/newspaperDetail/${article._id}`} className="card-thumb-link">
                            <img src={article.thumbnail} alt={article.title} />
                        </Link>
                        <div className="card-body">
                            <h3 className="card-title">
                                <Link to={`/newspaperDetail/${article._id}`}>
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

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

        </div>
    );
};

export default CategoryPage;