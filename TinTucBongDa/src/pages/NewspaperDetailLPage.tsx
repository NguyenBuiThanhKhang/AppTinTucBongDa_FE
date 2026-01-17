import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import NewspaperDetail, { type NewspaperDetailProps } from "../component/NewspaperDetail";

const LANGUAGE_CODES = ["VietNam", "English", "Spanish", "French"];

function NewspaperDetailPage() {
    const { id } = useParams();

    const [newsDetail, setNewsDetail] = useState<NewspaperDetailProps | null>(null);
    const [newsDetailS, setNewsDetailS] = useState("");
    const [lang, setLang] = useState<string>("VietNam");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        const fetchNews = async () => {
            setLoading(true);
            try {
                const res = await axiosClient.post("/mtl/getNews", {
                    idArticle: id,
                    codes: lang
                });
                setNewsDetail(res.data);
                setNewsDetailS(JSON.stringify(res.data.title))
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
    if (!newsDetail) return <div>{newsDetailS}</div>;

    return (
        <div>
            <div className="language-switch" style={{ marginBottom: 16 }}>
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
                rate={newsDetail.rate}
                listComment={newsDetail.listComment}
            />
        </div>
    );
}

export default NewspaperDetailPage;
