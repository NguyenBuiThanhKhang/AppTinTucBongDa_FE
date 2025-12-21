import {useState} from "react";

function RateInput() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="rate-input-container">
            <div className="input-value">
                {[1, 2, 3, 4, 5].map((num) => (
                    <i
                        key={num}
                        className={`fa-solid fa-star star ${num <= (hover || rating) ? "star-chose" : ""}`}
                        onClick={() => setRating(num)}
                        onMouseEnter={() => setHover(num)}
                        onMouseLeave={() => setHover(0)}
                        style={{ cursor: 'pointer' }}
                    ></i>
                ))}
            </div>
            <div className="btn-confirm">
                <p>Bạn đang chọn: {rating} sao</p>
                <button className={"btn btn-success"} onClick={() => alert(`Đã đánh giá: ${rating}`)}>Gửi đánh giá</button>
            </div>
        </div>
    );
}

export default RateInput;