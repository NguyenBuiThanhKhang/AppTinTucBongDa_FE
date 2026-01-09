import React from 'react';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    
    // Logic tạo danh sách trang (1 ... 4  6 ... 100)
    const generatePages = () => {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="pagination-container">
            <button 
                className={`page-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo; Trước
            </button>

            <div className="page-numbers">
                {generatePages().map((item, index) => (
                    <button 
                        key={index}
                        className={`page-btn number ${item === currentPage ? 'active' : ''} ${item === '...' ? 'dots' : ''}`}
                        onClick={() => typeof item === 'number' && onPageChange(item)}
                        disabled={item === '...'}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <button 
                className={`page-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Sau &raquo;
            </button>
        </div>
    );
};

export default Pagination;