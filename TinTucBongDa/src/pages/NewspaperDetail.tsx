import RateInput from "../component/reviewsAndComments/RateInput.tsx";
import Rating, {type RatingProps} from "../component/reviewsAndComments/Evaluation.tsx";
import RenderListCmt, {type CommentListProps, type CommentProps} from "../component/reviewsAndComments/Comment.tsx";

// export const staticValueND ={
//     title: "U22 Việt Nam Lên Ngôi Vô Địch SEA Games 33 Sau Màn Lội Ngược Dòng Lịch Sử",
//     introduction: "Trong một đêm huyền diệu tại sân vận động Rajamangala," +
//         " thầy trò HLV Kim Sang-sik đã đánh bại chủ nhà Thái Lan với tỷ số 3-2 " +
//         "để bảo vệ thành công tấm huy chương vàng bóng đá nam SEA Games 33.",
//     content: [
//         {
//             numberOrder: 1,
//             type: 1, // Tiêu đề phụ
//             contentBlock: "Hiệp một đầy sóng gió tại chảo lửa Rajamangala"
//         },
//         {
//             numberOrder: 2,
//             type: 2, // Văn bản
//             contentBlock: "Trận chung kết SEA Games 33 giữa U22 Việt Nam và" +
//                 " U22 Thái Lan đã diễn ra với kịch bản không dành cho những người" +
//                 " yếu tim. Ngay sau tiếng còi khai cuộc, với lợi thế sân nhà và sự" +
//                 " cổ vũ cuồng nhiệt của hàng vạn khán giả, 'Voi chiến' đã tràn lên tấn" +
//                 " công mạnh mẽ. Những pha áp sát liên tục và lối chơi không ngại va chạm" +
//                 " của Thái Lan đã khiến hàng thủ Việt Nam lúng túng. Chỉ trong vòng 30 phút" +
//                 " đầu trận, lưới của thủ thành Trung Kiên đã phải rung lên tới hai lần sau" +
//                 " những pha dứt điểm hiểm hóc của các tiền đạo chủ nhà. Tưởng chừng như giấc" +
//                 " mơ vàng của bóng đá Việt Nam sẽ tan vỡ khi các ngôi sao như Đình Bắc bị" +
//                 " theo kèm chặt và phong tỏa hoàn toàn mọi hướng tấn công từ hai biên."
//         },
//         {
//             numberOrder: 3,
//             type: 3, // Ảnh
//             contentBlock: "https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-bong-da-doi-tuyen-Viet-nam-Full-HD.jpg"
//         },
//         {
//             numberOrder: 4,
//             type: 1, // Tiêu đề phụ
//             contentBlock: "Bản lĩnh thép và sự thay người thần kỳ của HLV Kim Sang-sik"
//         },
//         {
//             numberOrder: 5,
//             type: 2, // Văn bản
//             contentBlock: "Bước sang hiệp hai, HLV Kim Sang-sik" +
//                 " đã chứng minh tại sao ông được coi là 'vị vua mới'" +
//                 " của bóng đá khu vực với những điều chỉnh nhân sự đầy" +
//                 " táo bạo. Việc đưa Thanh Nhàn vào sân đã thay đổi hoàn" +
//                 " toàn cục diện trận đấu. Tinh thần không bỏ cuộc được các cầu" +
//                 " thủ Việt Nam thể hiện rõ rệt khi họ có bàn rút ngắn tỷ số xuống" +
//                 " còn 1-2 ngay ở những phút đầu hiệp hai. Áp lực kinh khủng được tạo" +
//                 " ra khiến hàng thủ Thái Lan bắt đầu bộc lộ những sai lầm chết người dưới" +
//                 " sức ép của các cầu thủ áo đỏ. Phút 85, cả khán đài như nổ tung khi U22 Việt Nam" +
//                 " có bàn gỡ hòa 2-2 đầy quý giá. Trận đấu buộc phải bước vào hiệp phụ, nơi định mệnh" +
//                 " đã gọi tên Thanh Nhàn với cú dứt điểm chuẩn xác ở phút cuối cùng, ấn định chiến thắng" +
//                 " 3-2 nghẹt thở cho Việt Nam."
//         },
//         {
//             numberOrder: 6,
//             type: 3, // Ảnh
//             contentBlock: "https://cdn-img.thethao247.vn/storage/files/namnv/2023/05/13/lich-thi-dau-bong-da-nam-sea-games-32-279858.jpg"
//         },
//         {
//             numberOrder: 7,
//             type: 1, // Tiêu đề phụ
//             contentBlock: "Khởi đầu cho một kỷ nguyên thăng hoa mới"
//         },
//         {
//             numberOrder: 8,
//             type: 2, // Văn bản
//             contentBlock: "Chiến thắng này không chỉ giúp U22 Việt Nam giành tấm huy chương vàng" +
//                 " danh giá mà còn là lời khẳng định đanh thép về vị thế số một tại Đông Nam Á. Sau" +
//                 " hơn 30 năm nỗ lực xóa bỏ 'dớp' thất bại trước người Thái, bóng đá Việt Nam giờ đây" +
//                 " đã có thể tự tin đối đầu sòng phẳng ngay trên thánh địa của đối thủ. Ngay sau trận đấu" +
//                 ", Liên đoàn Bóng đá Việt Nam (VFF) đã quyết định thưởng nóng 1 tỷ đồng để khích lệ tinh" +
//                 " thần toàn đội. Người hâm mộ trên khắp cả nước đã đổ ra đường 'đi bão' để ăn mừng chiến" +
//                 " tích lịch sử này. Đây chắc chắn sẽ là bàn đạp quan trọng để bóng đá Việt Nam hướng tới " +
//                 "những mục tiêu xa hơn tại đấu trường châu lục và hiện thực hóa giấc mơ World Cup trong" +
//                 " tương lai gần."
//         }
//     ]
// };
type BlockNewspaper ={
    numberOrder : number,
    type: number,
    contentBlock: string;
}

type NewspaperDetailProps ={
    title: string,
    introduction: string,
    content: BlockNewspaper[],
    rate: RatingProps,
    listComment: CommentListProps
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
                <div className={"blockNewspaper-img"} id={"block" + b.numberOrder}
                     key={b.numberOrder}>
                    <img src={b.contentBlock} alt={b.contentBlock}/>
                </div>
            );
    }
}

function NewspaperDetail({title, introduction, content, rate, listComment}: NewspaperDetailProps) {
    return (
        <div className="body-newspaper">
            <link rel="stylesheet" href="/src/scss/NewspaperDetail.css"/>
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
                <div className="rating-container">
                    <Rating rate={rate.rate}/>
                </div>
            </div>
            <div className="comment">
                <RenderListCmt listCmt={listComment.listCmt}/>
            </div>
        </div>
    )
}

export default NewspaperDetail;