import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./css/MainMenu.css";

// 1. Interface dữ liệu thô từ API (Phẳng)
interface CategoryRaw {
    _id: string;
    name: string;
    slug: string;
    parent: string | null;
}

// 2. Interface dữ liệu cây dùng để hiển thị (Lồng nhau)
interface CategoryTree extends CategoryRaw {
    children: CategoryTree[];
}

export default function MainMenu() {
    const [categories, setCategories] = useState<CategoryTree[]>([]);

    useEffect(() => {
        // --- CHUYỂN HÀM XỬ LÝ VÀO TRONG USEEFFECT ĐỂ TRÁNH LỖI DEPENDENCY ---
        const buildCategoryTree = (items: CategoryRaw[]): CategoryTree[] => {
            const tree: CategoryTree[] = [];
            const map: { [key: string]: CategoryTree } = {};

            // Bước 1: Tạo map
            items.forEach(item => {
                map[item._id] = { ...item, children: [] };
            });

            // Bước 2: Xếp con vào cha
            items.forEach(item => {
                // Kiểm tra item.parent có tồn tại và map[item.parent] có trong danh sách không
                if (item.parent && map[item.parent]) {
                    map[item.parent].children.push(map[item._id]);
                } else {
                    // Nếu không có cha hoặc cha không tìm thấy -> Nó là gốc
                    tree.push(map[item._id]);
                }
            });

            return tree;
        };

        const fetchData = async () => {
            try {
                // --- SỬA LỖI TYPESCRIPT Ở ĐÂY ---
                // Ép kiểu về unknown trước để báo TS rằng "Tôi biết tôi đang làm gì với Interceptor"
                const response = await axiosClient.get('/categories');
                const rawData = response as unknown as CategoryRaw[];

                // Gọi hàm biến đổi
                const treeData = buildCategoryTree(rawData);
                setCategories(treeData);
            } catch (error) {
                console.error("Lỗi tải menu:", error);
            }
        };

        fetchData();
    }, []); // Dependency array rỗng là đúng vì logic nằm hết bên trong

    return (
        <nav className="menu-container">
            <ul className="main-menu">
                <li className="menu-item"><Link to="/">TRANG CHỦ</Link></li>

                {categories.map(cat => (
                    <li key={cat._id} className="menu-item">
                        <Link to={`/${cat.slug}`}>{cat.name}</Link>

                        {cat.children.length > 0 && (
                            <ul className="sub-menu">
                                {cat.children.map(sub => (
                                    <li key={sub._id}>
                                        <Link to={`/${sub.slug}`}>
                                            {sub.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}