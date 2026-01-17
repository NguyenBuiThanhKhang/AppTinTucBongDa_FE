import { useState, useEffect } from "react";
import RateInput from "./reviewsAndComments/RateInput.tsx";
import Rating, {type RatingProps} from "./reviewsAndComments/Evaluation.tsx";
import RenderListCmt, {type CommentListProps} from "./reviewsAndComments/Comment.tsx";
import LinkOfProject from "../utils/LinkOfProject.tsx";
import InputComment from "./reviewsAndComments/InputComment.tsx";
import userApi from "../api/userApi.ts";

type BlockNewspaper ={
    numberOrder : number,
    type: number,
    contentBlock: string;
}

export type NewspaperDetailProps ={
    articleId: string;
    title: string,
    introduction: string,
    content: BlockNewspaper[],
    rate: RatingProps,
    listComment: CommentListProps
}

function NewspaperDetail({articleId, title, introduction, content, rate, listComment}: NewspaperDetailProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const userStr = localStorage.getItem("user_info");
        const token = localStorage.getItem("access_token");

        if (token && userStr) {
            setIsAuthenticated(true);
            try {
                const user = JSON.parse(userStr);
                if (user.savedArticles && Array.isArray(user.savedArticles)) {
                    if (user.savedArticles.includes(articleId)) {
                        setIsSaved(true);
                    }
                }
            } catch (e) {
                console.error("Lỗi đọc dữ liệu user từ storage", e);
            }
        }
    }, [articleId]);

    const handleSaveClick = async () => {
        if (!isAuthenticated) {
            alert("Bạn cần đăng nhập để lưu bài viết!");
            return;
        }

        try {
            const response: any = await userApi.toggleSaveArticle(articleId);

            if (response.success) {
                setIsSaved(response.isSaved);
                alert(response.message);

                const userStr = localStorage.getItem("user_info");
                if (userStr) {
                    const user = JSON.parse(userStr);
                    
                    if (!user.savedArticles) user.savedArticles = [];

                    if (response.isSaved) {
                        if (!user.savedArticles.includes(articleId)) {
                            user.savedArticles.push(articleId);
                        }
                    } else {
                        user.savedArticles = user.savedArticles.filter((id: string) => id !== articleId);
                    }
                    localStorage.setItem("user_info", JSON.stringify(user));
                }
            }
        } catch (error) {
            console.error("Lỗi khi lưu bài:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
    };

    function renderBlockNewspaper(b:BlockNewspaper){
        switch (b.type){
            // Tieu de phu
            case 1:
                return (
                    <div className={"blockNewspaper-heading2"} id={"block" + b.numberOrder}
                         key={b.numberOrder}>
                        <p>{b.contentBlock}</p>
                    </div>
                );
            // Van ban
            case 2:
                return (
                    <div className={"blockNewspaper-text"} id={"block" + b.numberOrder}
                         key={b.numberOrder}>
                        <p>{b.contentBlock}</p>
                    </div>
                );
            //Anh
            case 3:
                return (
                    <div className={"blockNewspaper-img"} id={"block" + b.numberOrder}
                         key={b.numberOrder}>
                        <img src={b.contentBlock} alt={b.contentBlock}/>
                    </div>
                );
        }
    }
    return (
        <div className="body-newspaper">
            <link rel="stylesheet" href="/src/scss/NewspaperDetail.css"/>
            <LinkOfProject tyeLink={"fontawesome"}/>
            <LinkOfProject tyeLink={"bootstrap"}/>
            <div className="breadcrumb">
                <a>Home</a> / <a>Category</a> / <a>Detail</a>
            </div>
            <div className="title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, flex: 1 }}>{title}</p>
                
                <button 
                    onClick={handleSaveClick}
                    title={isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}
                    style={{
                        background: 'transparent',
                        border: '1px solid #ddd',
                        borderRadius: '50%',
                        width: '45px',
                        height: '45px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '15px',
                        transition: '0.2s'
                    }}
                >
                    <i 
                        className={isSaved ? "fa-solid fa-heart" : "fa-regular fa-heart"} 
                        style={{ 
                            color: isSaved ? '#d0021b' : '#555', 
                            fontSize: '22px' 
                        }}
                    ></i>
                </button>
            </div>
            <div className="introduction">
                {introduction}
            </div>
            <div className="content-newspaper">
                {
                    content.sort((a: BlockNewspaper, b: BlockNewspaper) => a.numberOrder - b.numberOrder)
                        .map((blockContent: BlockNewspaper) => (
                                renderBlockNewspaper(blockContent)
                            )
                        )
                }
            </div>
            <div className="evaluation">
                <div className="rate-input-container">
                    <RateInput/>
                </div>

                <Rating rate={rate.rate}/>
            </div>
            <div className="comment">
                <div className="input-cmt">
                    <InputComment/>
                </div>
                <div className="title">
                    Bình luận:
                </div>
                <div className="content">
                    <RenderListCmt listCmt={listComment.listCmt}/>
                </div>
            </div>
        </div>
    )
}

export default NewspaperDetail;