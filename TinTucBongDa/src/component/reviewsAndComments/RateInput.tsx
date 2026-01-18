import {useState} from "react";
import axiosClient from "../../api/axiosClient.ts";
import {useNavigate} from "react-router-dom";

function RateInput() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isRated,setIsRated] = useState(false);
    const na = useNavigate();
    if (isRated) return;
    const classStatusYes = "fa-solid fa-circle-check"
    const classStatusNo= "fa-regular fa-circle"
    async function sendRate(){
        if(rating === null){
            return;
        }
        const userID = localStorage.getItem("userId");
        if(!userID){
            na("/login")
            return;
        }
        const articleID = localStorage.getItem("articleId");
        if(!articleID){
            alert("Lỗi không tìm thấy bài viết")
            return;
        }
        try {
            const rateData={
                idArticle: articleID,
                author: userID,
                rate: rating
            }
            await axiosClient.post("/rates",rateData)
            if(isRated){
                const status = document.querySelector(".status-send-rate");
                if(status){
                    status.classList.remove(classStatusNo);
                    status.classList.add(classStatusYes);
                }
            }
            alert("Danh gia thanh cong");
            setIsRated(true);
        } catch(error){
            console.log("Lỗi server: "+error);
        }
    }
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
                <button className={"btn-sub btn-success"} onClick={sendRate}>Gửi đánh giá</button>
                <i className=" status-send-rate fa-regular fa-circle"></i>
            </div>
        </div>
    );
}

export default RateInput;