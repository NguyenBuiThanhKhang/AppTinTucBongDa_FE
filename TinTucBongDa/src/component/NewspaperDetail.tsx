import RateInput from "./reviewsAndComments/RateInput.tsx";
import Rating, {type RatingProps} from "./reviewsAndComments/Evaluation.tsx";
import RenderListCmt, {type CommentListProps} from "./reviewsAndComments/Comment.tsx";
import LinkOfProject from "../utils/LinkOfProject.tsx";
import InputComment from "./reviewsAndComments/InputComment.tsx";

type BlockNewspaper ={
    numberOrder : number,
    type: number,
    contentBlock: string;
}

export type NewspaperDetailProps ={
    title: string,
    introduction: string,
    content: BlockNewspaper[],
    rate: RatingProps,
    listComment: CommentListProps
}

function NewspaperDetail({title, introduction, content, rate, listComment}: NewspaperDetailProps) {
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
            </div>
            <div className="title">
                <p>{title}</p>
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