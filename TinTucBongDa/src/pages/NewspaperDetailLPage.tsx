import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import NewspaperDetail, { type NewspaperDetailProps } from "../component/NewspaperDetail";
import type {RatingProps} from "@/component/reviewsAndComments/Evaluation.tsx";
import type {CommentListProps} from "@/component/reviewsAndComments/Comment.tsx";

const LANGUAGE_CODES = ["VietNam", "English", "Spanish", "French"];

function NewspaperDetailPage() {
    const {id} = useParams();
    const [rate,setRate] = useState<RatingProps>({rate:0});
    const [cmt,setCmt] = useState<CommentListProps>({listCmt:[]});
    const [newsDetail, setNewsDetail] = useState<NewspaperDetailProps | null>(null);
    const [lang, setLang] = useState<string>("VietNam");
    const [loading, setLoading] = useState<boolean>(true);

    // const refreshRC = async () =>{
    //     const res = await axiosClient.post("/mtl/getNews", {
    //         idArticle: id,
    //         codes: lang
    //     });
    //     setRate(res.data.rate);
    //     setCmt(res.data.listComment);
    // }
    // document.querySelector('.btn-sub').addEventListener('click',() => {
    //     refreshRC();
    // });
    useEffect(() => {
        if (!id) return;
        if (id) {
            localStorage.setItem("articleId", id);
        }
        const fetchNews = async () => {
            setLoading(true);
            try {
                const res = await axiosClient.post("/mtl/getNews", {
                    idArticle: id,
                    codes: lang
                });
                setNewsDetail(res.data);
                setRate(res.data.rate);
                setCmt(res.data.listComment);
            } catch (error) {
                console.error("Lỗi tải bài báo:", error);
                setNewsDetail(null);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id, lang]);

    if (loading) return <div>Đang tải nội dung...</div>;
    if (!newsDetail) return <div>Không tìm thấy bài báo</div>;
    if (!id) return <div>Không tìm thấy id</div>;
    return (
        <div>
            <div className="language-switch" style={{marginBottom: 16}}>
                {LANGUAGE_CODES.map(code => (
                    <button
                        key={code}
                        onClick={() => lang !== code && setLang(code)}
                        style={{
                            marginRight: 8,
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontWeight: lang === code ? "bold" : "normal",
                            borderRadius: "5px",
                        }}
                    >
                        {code}
                    </button>
                ))}
            </div>

            <NewspaperDetail
                articleId={id || ""}
                title={newsDetail.title}
                introduction={newsDetail.introduction}
                content={newsDetail.content}
                rate={rate}
                listComment={cmt}
            />
        </div>
    );
}

export default NewspaperDetailPage;
