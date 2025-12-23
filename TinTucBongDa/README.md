📘 TÀI LIỆU QUY CHUẨN PHÁT TRIỂN DỰ ÁN (DEV GUIDELINE)

1. QUY TẮC CHUNG (GENERAL RULES)
   Monorepo: Tất cả code nằm chung 1 repo Git.

- /Server: Code Backend (Node.js).
- /TinTucBongDa: Code Frontend (React).
- /Crawler: Code Python.

Environment: File .env không được push lên Git. Mỗi thành viên phải tự tạo file .env ở máy mình (nội dung giống nhau).

2. QUY CHUẨN BACKEND (NODE.JS)
   Mọi tính năng mới đều phải tuân thủ luồng MVC: Model -> Controller -> Route -> index.js

Bước 1: Tạo Model (Khuôn mẫu dữ liệu)
Vị trí: Server/models/TenModel.js
Quy tắc: Tên file viết hoa chữ cái đầu (PascalCase).

Bước 2: Tạo Controller (Xử lý logic)
Vị trí: Server/controllers/tenController.js
Code mẫu chuẩn (bắt buộc dùng try-catch):

    const getSomething = async (req, res) => {
        try {
            // Logic lấy dữ liệu từ DB
            const data = await Model.find().lean(); // Dùng .lean() cho danh sách
            res.status(200).json(data);
        } catch (error) {
            // Chuẩn hóa lỗi trả về
            res.status(500).json({ message: 'Lỗi Server', error: error.message });
        }
    };

Bước 3: Tạo Route (Đường dẫn)
Vị trí: Server/routes/tenRoutes.js
Code mẫu:

    const express = require('express');
    const router = express.Router();
    const { getSomething } = require('../controllers/tenController');
    
    router.get('/', getSomething); // Định nghĩa method GET/POST/PUT/DELETE
    module.exports = router;

Bước 4: Đăng ký tại index.js
Mở file Server/index.js, thêm dòng: app.use('/api/ten-tinh-nang', require('./routes/tenRoutes'));

3. QUY CHUẨN FRONTEND (REACT + TS)
   Đây là phần quan trọng nhất để tận dụng code chung.

Nguyên tắc vàng:
- KHÔNG dùng axios trực tiếp. BẮT BUỘC dùng axiosClient (đã cấu hình sẵn BaseURL và Interceptor).
- KHÔNG hardcode URL (như http://localhost...).

Luồng code một tính năng mới (Ví dụ: Trang chi tiết bài viết):
Bước 1: Định nghĩa Interface (Kiểu dữ liệu) Luôn định nghĩa dữ liệu trả về trông như thế nào.

    interface Article {
    _id: string;
    title: string;
    content: string;
    }

Bước 2: Gọi API bằng axiosClient

    import axiosClient from '../api/axiosClient'; // Import hàng chung
    
    // Trong useEffect hoặc hàm xử lý:
    const fetchData = async () => {
        try {
            // Chỉ cần gõ phần đuôi, không cần gõ localhost
            // Interceptor tự động trả về data (không cần response.data)
            const result = await axiosClient.get('/articles/chi-tiet-bai-viet');
            setData(result as Article);
        } catch (error) {
            console.error("Lỗi:", error);
        }
    }

Bước 3: Cấu trúc thư mục Component
src/components/common/: Các thành phần dùng lại nhiều nơi (Button, Card tin tức, Menu).
src/pages/: Các trang chính (Trang chủ, Trang danh mục, Trang chi tiết).