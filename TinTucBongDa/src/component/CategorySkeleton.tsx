import React from 'react';

const CategorySkeleton = () => {
    return (
        <div className="container category-page" style={{ marginTop: '20px' }}>
            {/* Breadcrumb Skeleton */}
            <div className="skeleton text-line short" style={{ height: '20px', width: '200px', marginBottom: '10px' }}></div>
            
            {/* Title Skeleton */}
            <div className="skeleton text-line short" style={{ height: '40px', width: '300px', marginBottom: '30px' }}></div>

            {/* Hero Skeleton */}
            <div className="hero-skeleton">
                <div className="skeleton hero-skeleton-img"></div>
                <div className="hero-skeleton-text">
                    <div className="skeleton text-line" style={{ height: '30px' }}></div>
                    <div className="skeleton text-line"></div>
                    <div className="skeleton text-line"></div>
                    <div className="skeleton text-line short"></div>
                </div>
            </div>

            {/* Grid List Skeleton */}
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
};

export default CategorySkeleton;