export type RatingProps ={
    rate: number
}

function Rating({ rate }: RatingProps) {
    const validRate = Math.min(Math.max(rate, 0), 5);
    const starPercentage = (validRate / 5) * 100;

    return (
        <div className="rating-container">
            <div className="star-rating">

                <div className="stars-outer">
                    ★★★★★
                    <div className="stars-inner" style={{ width: `${starPercentage}%` }}>
                        ★★★★★
                    </div>
                </div>
            </div>
            <div className="rate-number">
                <span>{validRate.toFixed(1)}</span>
            </div>
        </div>
    );
}

export default Rating;