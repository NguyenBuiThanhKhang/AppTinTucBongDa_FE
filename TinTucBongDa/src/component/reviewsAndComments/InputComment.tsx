import {useState} from "react";
import axiosClient from "../../api/axiosClient.ts";
import {useNavigate} from "react-router-dom";

function InputComment(){
    const [commentText, setCommentText] = useState('');
    const na = useNavigate();
    async function  sendCmt()  {
        if(commentText === null){
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
            <button className={"btn-sub"} onClick={sendCmt}>Gửi</button>
        </div>
    )
}

export default InputComment;