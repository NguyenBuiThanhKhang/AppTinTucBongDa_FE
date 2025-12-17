
type BlockNewspaper ={
    numberOrder : number,
    type: number,
    contentBlock: string;
}

type NewspaperDetailProps ={
    title: string,
    introduction: string,
    content: BlockNewspaper[]
}
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
                <div className={"blockNewspaper-text"} id={"block" + b.numberOrder}
                     key={b.numberOrder}>
                    <img src={"/img/"+b.contentBlock} alt={b.contentBlock}/>
                </div>
            );
    }
}

function NewspaperDetail({title, introduction, content}: NewspaperDetailProps) {
    return (
        <div className="body-newspaper">
            <div className="breadcrumb">
                <a>Home</a> / <a>Category</a> / <a>Detail</a>
            </div>
            <div className="title">
            <p>{title}</p>
            </div>
            <div className="introduction">
                {introduction}
            </div>
            <div className="content-newspaper">
                {
                    content.sort((a:BlockNewspaper, b: BlockNewspaper) => a.numberOrder - b.numberOrder)
                        .map((blockContent:BlockNewspaper)=>(
                            renderBlockNewspaper(blockContent)
                        )
                    )
                }
            </div>
        </div>
    )
}
export default NewspaperDetail;