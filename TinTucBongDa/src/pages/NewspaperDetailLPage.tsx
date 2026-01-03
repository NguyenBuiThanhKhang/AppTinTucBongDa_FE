import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient.ts";
import NewspaperDetail, { type NewspaperDetailProps } from "../component/NewspaperDetail.tsx";

function NewspaperDetailPage() {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState<NewspaperDetailProps | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("render....")
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/articles/nd/${id}`);
                setNewsDetail(response.data);
            } catch (error) {
                console.error("Lỗi tải bài báo:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Đang tải nội dung...</div>;
    if (!newsDetail) return <div>Không tìm thấy bài báo!</div>
    console.log(newsDetail);
    return (
        <NewspaperDetail title={newsDetail.title}  introduction={newsDetail.introduction}
            content={newsDetail.content} rate={newsDetail.rate} listComment={newsDetail.listComment}/>
    );
}

export default NewspaperDetailPage;