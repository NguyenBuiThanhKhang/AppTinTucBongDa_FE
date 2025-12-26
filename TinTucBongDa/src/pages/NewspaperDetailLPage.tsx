import {useEffect} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "../api/axiosClient.ts";
import NewspaperDetail, {type NewspaperDetailProps} from "../component/NewspaperDetail.tsx";

function NewspaperDetailPage(){
    const {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/nd/'+{id});
                const newDetailProps = response.data as unknown as NewspaperDetailProps;
                return (
                    <NewspaperDetail title={newDetailProps.title} introduction={newDetailProps.introduction}
                                     content={newDetailProps.content} rate={newDetailProps.rate}
                                     listComment={newDetailProps.listComment}/>
                )
            } catch (error) {
                console.error("Lỗi tải bài báo:", error);
            }
        };
        fetchData();
    }, []);
}
export default NewspaperDetailPage;