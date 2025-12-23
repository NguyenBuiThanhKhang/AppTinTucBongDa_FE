import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./css/MainMenu.css";

interface CategoryRaw {
    _id: string;
    name: string;
    slug: string;
    parent: string | null;
}

interface CategoryTree extends CategoryRaw {
    children: CategoryTree[];
}

export default function MainMenu() {
    const [categories, setCategories] = useState<CategoryTree[]>([]);

    useEffect(() => {

        // Biến đổi dữ liệu thành dạng tree
        const buildCategoryTree = (items: CategoryRaw[]): CategoryTree[] => {
            const tree: CategoryTree[] = [];
            const map: { [key: string]: CategoryTree } = {};

            // Bước 1: Tạo map
            items.forEach(item => {
                map[item._id] = {...item, children: []};
            });

            // Bước 2: Xếp con vào cha
            items.forEach(item => {
                if (item.parent && map[item.parent]) {
                    map[item.parent].children.push(map[item._id]);
                } else {
                    tree.push(map[item._id]);
                }
            });

            return tree;
        };

        // gọi API
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/categories');
                const rawData = response as unknown as CategoryRaw[];

                const treeData = buildCategoryTree(rawData);
                setCategories(treeData);
            } catch (error) {
                console.error("Lỗi tải menu:", error);
            }
        };

        fetchData();
    }, []);

    // render giao diện
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