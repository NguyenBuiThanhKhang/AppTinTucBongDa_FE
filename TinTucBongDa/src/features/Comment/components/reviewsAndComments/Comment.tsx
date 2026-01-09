export type CommentProps ={
    _id: string
    author: string
    content: string
}
export type CommentListProps = {
    listCmt: CommentProps[]
}
function RenderListCmt({listCmt}: CommentListProps ){
    return(
        <>
            {listCmt.map((cmt) => (
                <Comment key={cmt._id} {...cmt} />
            ))}
        </>
    )
}
function Comment({author, content}: CommentProps) {
    const type = 1;
    if(type === 1){
        return (
            <div className="comment-block">
                <div className="author">
                    <p>{author}</p>
                </div>
                <div className="content">
                    <p>{content}</p>
                </div>
            </div>
        )
    }
    if(type === 2){
        return (
            <div className="comment-block">
                <div className="author">
                    <p>{author}</p>
                </div>
                <div className="content">
                    <img src={content} alt={content}/>
                </div>
            </div>
        )
    }
    return null;
}
export default RenderListCmt;