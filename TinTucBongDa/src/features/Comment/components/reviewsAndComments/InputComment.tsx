import axiosClient from "@/api/axiosClient";
import {useState} from "react";

function InputComment(){
    const [commentText, setCommentText] = useState('');
    async function  sendCmt()  {
        if(commentText === null){
            return;
        }
        const userID = localStorage.getItem("userId")?localStorage.getItem("userId"):"69553a1208bf5338271fdd02";
        const articleID = localStorage.getItem("articleId")?localStorage.getItem("articleId"):"6953e810d09bb242d4281930";
        try {
            const commentData={
                idArticle: articleID,
                author: userID,
                content: commentText
            }
            const response = await axiosClient.post("/comments",commentData)
            if(response ===  null) return;
            setCommentText("");
            alert("Gửi bình luận thành công")
            setCommentText("")
        } catch(error){
            console.log("Lỗi server: "+error);
        }
    }
    return(
        <div className="input-cmt-container">
            <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button className={"btn"} onClick={sendCmt}>Gửi</button>
        </div>
    )
}

export default InputComment;