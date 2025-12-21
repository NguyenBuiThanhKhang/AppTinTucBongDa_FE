// // src/component/MainMenu.tsx
// import './css/MainMenu.css';
//
// // 1. Định nghĩa kiểu dữ liệu cho một mục menu (TypeScript)
// type MenuItem = {
//     id: number;
//     label: string;
//     link: string;
// };
//
// const MainMenu = () => {
//     // 2. Tạo danh sách dữ liệu (Sau này có thể lấy từ API)
//     const menuItems: MenuItem[] = [
//         { id: 1, label: "Việt Nam", link: "/viet-nam" },
//         { id: 2, label: "Champions League", link: "/c1" },
//         { id: 3, label: "Tây Ban Nha", link: "/laliga" },
//         { id: 4, label: "Đức", link: "/bundesliga" },
//         { id: 5, label: "Pháp", link: "/ligue1" },
//         { id: 6, label: "Italia", link: "/serie-a" },
//         { id: 7, label: "Thế giới", link: "/world" },
//         { id: 8, label: "Nhận định", link: "/nhan-dinh" },
//     ];
//
//     return (
//         <nav className="main-menu-wrapper">
//             <ul className="main-menu-list">
//                 {/* Mục đầu tiên là Icon Ngôi nhà (Home) */}
//                 <li className="menu-icon-home">
//                     <a href="/">🏠</a> {/* Bạn có thể thay bằng icon SVG hoặc hình ảnh */}
//                 </li>
//
//                 {/* 3. Dùng hàm .map() để lặp qua danh sách dữ liệu và tạo thẻ li */}
//                 {menuItems.map((item) => (
//                     <li key={item.id} className="menu-item">
//                         <a href={item.link}>{item.label}</a>
//                     </li>
//                 ))}
//             </ul>
//
//             {/* Phần bên phải: Tìm kiếm */}
//             <div className="menu-right">
//                 <span className="search-icon">🔍</span>
//             </div>
//         </nav>
//     );
// };
//
// export default MainMenu;

// src/component/MainMenu.tsx
import React from 'react';
import { MENU_DATA } from '../constants/menuData'; // Import dữ liệu cứng
import './css/MainMenu.css'; // Import CSS (Bước 3 sẽ làm)

const MainMenu: React.FC = () => {
    return (
        <nav className="main-nav">
            <div className="container">
                <ul className="nav-list">
                    {/* Nút Trang chủ (Thường là icon ngôi nhà) */}
                    <li className="nav-item home-icon">
                        <a href="/">🏠</a>
                    </li>

                    {/* Dùng hàm map để lặp qua dữ liệu cứng */}
                    {MENU_DATA.map((item) => (
                        <li key={item.id} className="nav-item">
                            <a href={item.link} className="nav-link">
                                {item.label}
                            </a>

                            {/* Kiểm tra: Nếu có menu con thì mới vẽ bảng xổ xuống */}
                            {item.children && item.children.length > 0 && (
                                <div className="mega-menu">
                                    <ul className="sub-menu-list">
                                        {item.children.map((subItem) => (
                                            <li key={subItem.id} className="sub-menu-item">
                                                <a href={subItem.link}>{subItem.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default MainMenu;