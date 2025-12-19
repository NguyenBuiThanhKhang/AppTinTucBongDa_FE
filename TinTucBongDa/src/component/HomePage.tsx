import './css/HomePage.css';

const HomePage = () => {
    // 1. Dữ liệu giả cho bài NỔI BẬT NHẤT (Cái to nhất bên trái)
    const tinNoiBat = {
        title: "Bảng tổng sắp huy chương SEA Games ngày 16/12: 'Mưa' HCV cho Việt Nam",
        image: "https://photo-baomoi.bmcdn.me/w700_r1/2023/05/16/24/45814524/1_156845.jpg", // Bạn có thể thay bằng link ảnh thật
        source: "Vietnamnet",
        time: "2 giờ",
        description: "Đoàn thể thao Việt Nam liên tiếp gặt hái huy chương vàng ở các bộ môn võ gậy, cử tạ..."
    };

    // 2. Dữ liệu giả cho 3 bài TIN LIÊN QUAN (Nằm dưới bài nổi bật)
    const tinLienQuan = [
        { id: 1, title: "Xuất lộ con đường thiêng ở thánh địa Mỹ Sơn", source: "ZNews", time: "1 giờ", img: "https://via.placeholder.com/300x200" },
        { id: 2, title: "Kỷ luật cảnh cáo Thứ trưởng và cựu Thứ trưởng", source: "VOV", time: "37 phút", img: "https://via.placeholder.com/300x200" },
        { id: 3, title: "Điều gì xảy ra khi lưu lượng Internet tăng 19%?", source: "Pháp luật", time: "1 giờ", img: "https://via.placeholder.com/300x200" },
    ];

    // 3. Dữ liệu giả cho cột TIN MỚI NHẤT (Bên phải)
    const tinMoiNhat = [
        { id: 1, title: "Tổng Bí thư Tô Lâm: Hà Nội tập trung vào 5 ưu tiên lớn", source: "Tin Tức", time: "1 giờ" },
        { id: 2, title: "TP.HCM phê duyệt nhiệm vụ quy hoạch khu đô thị ĐH Quốc gia", source: "Pháp luật", time: "1 phút" },
        { id: 3, title: "Dựng hiện trường vụ con rể dùng súng bắn vào nhà cha vợ", source: "Pháp luật", time: "4 phút" },
        { id: 4, title: "Người dân tự nguyện giao nộp 5 con rùa núi vàng quý hiếm", source: "Tin tức", time: "3 phút" },
        { id: 5, title: "Nguyễn Thị Oanh nói điều bất ngờ khi chạm mốc 15 HCV", source: "VOV", time: "2 phút" },
    ];

    return (
        <div className="homepage-container">

            {/* --- CỘT TRÁI (Tin chính) --- */}
            <div className="left-column">
                {/* Bài nổi bật (To nhất) */}
                <div className="highlight-news">
                    <img src={tinNoiBat.image} alt="Tin hot" className="highlight-img" />
                    <h1 className="highlight-title">{tinNoiBat.title}</h1>
                    <div className="meta-info">
                        <span className="source red">{tinNoiBat.source}</span>
                        <span className="time">{tinNoiBat.time}</span> • <span>56 liên quan</span>
                    </div>
                </div>

                {/* Hàng tin liên quan (3 bài nhỏ bên dưới) */}
                <div className="related-news-row">
                    {tinLienQuan.map(item => (
                        <div key={item.id} className="related-item">
                            <img src={item.img} alt={item.title} />
                            <h3>{item.title}</h3>
                            <div className="meta-info">
                                <span className="source bold">{item.source}</span>
                                <span className="time">{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- CỘT PHẢI (Sidebar tin mới) --- */}
            <div className="right-column">
                {tinMoiNhat.map(item => (
                    <div key={item.id} className="sidebar-item">
                        {/* Ảnh nhỏ bên trái */}
                        <div className="sidebar-img">
                            <img src="https://via.placeholder.com/100x70" alt="thumb" />
                        </div>
                        {/* Chữ bên phải */}
                        <div className="sidebar-content">
                            <h4>{item.title}</h4>
                            <div className="meta-info-small">
                                <span className="source red">{item.source}</span>
                                <span className="time">{item.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default HomePage;