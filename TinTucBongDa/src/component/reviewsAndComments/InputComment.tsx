import {useState} from "react";
import axiosClient from "../../api/axiosClient.ts";

function InputComment(){
    const [commentText, setCommentText] = useState('');
    async function  sendCmt()  {
        if(commentText === null){
            return;
        }
        try {
            const commentData={
                idArticle: 1,
                author: "ID_USER_HIEN_TAI",
                content: commentText
            }
            const response = await axiosClient.post("http://",commentData)
            if(response ===  null) return;
            if(response.status === 200){
                setCommentText("");
                alert("Gửi bình luận thành công")
            }else{
                alert("Lỗi: "+response.status);
            }
        } catch(error){
            console.log("Lỗi server: "+error);
        }
    }
    return(
        <div className="input-cmt-container">
            <input type="text" name="comment-content-in" id="comment-content-in"
                   onChange={(e)=>setCommentText(e.target.value)}/>
            <button type="submit" onClick={sendCmt}>Gửi</button>
        </div>
    )
}
export default InputComment;