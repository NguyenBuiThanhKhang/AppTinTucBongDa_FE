// src/constants/menuData.ts

export interface MenuItem {
    id: number;
    label: string; // Tên hiển thị
    link: string;  // Đường dẫn
    children?: MenuItem[]; // Menu con (có thể có hoặc không)
}

export const MENU_DATA: MenuItem[] = [
    {
        id: 1,
        label: "BÓNG ĐÁ VIỆT NAM",
        link: "/bong-da-viet-nam",
        children: [
            { id: 11, label: "Đội tuyển Việt Nam", link: "/dt-viet-nam" },
            { id: 12, label: "V.League", link: "/v-league" },
            { id: 13, label: "Hạng Nhất", link: "/hang-nhat" },
            { id: 14, label: "Cúp Quốc gia", link: "/cup-quoc-gia" },
            { id: 15, label: "Bóng đá nữ", link: "/bong-da-nu" },
            { id: 16, label: "Futsal", link: "/futsal" },
            { id: 17, label: "Phong trào", link: "/phong-trao" },
            { id: 18, label: "Chuyển nhượng V.League", link: "/cn-vleague" },
        ]
    },
    {
        id: 2,
        label: "BÓNG ĐÁ ANH",
        link: "/bong-da-anh",
        children: [
            { id: 21, label: "Ngoại hạng Anh", link: "/premier-league" },
            { id: 22, label: "FA Cup", link: "/fa-cup" },
            { id: 23, label: "League Cup", link: "/league-cup" },
            { id: 24, label: "Hạng nhất Anh", link: "/championship" },
        ]
    },
    {
        id: 3,
        label: "TÂY BAN NHA",
        link: "/tay-ban-nha",
        children: [
            { id: 31, label: "La Liga", link: "/la-liga" },
            { id: 32, label: "Cúp Nhà Vua", link: "/copa-del-rey" },
        ]
    },
    {
        id: 4,
        label: "CÚP CHÂU ÂU",
        link: "/cup-chau-au",
        children: [
            { id: 41, label: "Champions League", link: "/c1" },
            { id: 42, label: "Europa League", link: "/c2" },
        ]
    },
    // Bạn có thể thêm tiếp các mục khác (Đức, Ý, Pháp...)
];