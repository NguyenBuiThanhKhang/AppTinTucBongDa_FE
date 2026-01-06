import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { timeAgo } from '../utils/dateUtils';
import '../scss/CategoryPage.scss'; 
import Pagination from '../component/Pagination'; 

interface Article {
    _id: string;
    title: string;
    slug: string;
    thumbnail: string;
    sapo: string;
    createdAt: string;
    author?: string;
}

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 12; 

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!keyword) return;
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/articles/search`, {
                    params: {
                        keyword: keyword,
                        page: page,
                        limit: LIMIT
                    }
                });

                if (res.data.success) {
                    setArticles(res.data.data);
                    if (res.data.pagination) {
                        setTotalPages(res.data.pagination.totalPages);
                    }
                }
            } catch (error) {
                console.error("Lỗi tìm kiếm:", error);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };

        fetchSearch();
    }, [keyword, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="container category-page" style={{ marginTop: '20px' }}>
            <div className="cat-header">
                <h1>Kết quả tìm kiếm cho: "{keyword}"</h1>
                <div className="cat-line"></div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>Đang tìm kiếm...</div>
            ) : (
                <>
                    <div className="list-grid">
                        {articles.length > 0 ? (
                            articles.map((article) => (
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
                                            <span className="time">{timeAgo(article.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '20px' }}>Không tìm thấy bài viết nào phù hợp.</div>
                        )}
                    </div>

                    <Pagination 
                        currentPage={page} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </>
            )}
        </div>
    );
};

export default SearchPage;