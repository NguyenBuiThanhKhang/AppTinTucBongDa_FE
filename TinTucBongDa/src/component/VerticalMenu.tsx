import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../scss/Header.scss';

function VerticalMenu() {
    const [urlAvatar] = useState("src/assets/img/imgNull/nullAvtAccount.png");
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem("userId"));

    const menuRef = useRef<HTMLDivElement>(null);

    const logout = () => {
        localStorage.clear();
        setUsername(null);
        setIsOpen(false);
        navigate("/");
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <div className="user-menu-wrapper" ref={menuRef}>
            <div
                className={`user-avatar-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isLoggedIn ? (
                    <img src={urlAvatar} alt="avt" />
                ) : (
                    <i className="fa-solid fa-user"></i>
                )}
            </div>

            {isOpen && (
                <div className="dropdown-menu-box">
                    <div className="menu-header">
                        <p className="user-name">{username || "Khách truy cập"}</p>
                        <span className="user-role">{isLoggedIn ? "Thành viên" : "Vui lòng đăng nhập"}</span>
                    </div>

                    <div className="menu-list">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="menu-item" onClick={() => setIsOpen(false)}>
                                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                    <span>Đăng nhập</span>
                                </Link>
                                <Link to="/register" className="menu-item" onClick={() => setIsOpen(false)}>
                                    <i className="fa-solid fa-user-plus"></i>
                                    <span>Tạo tài khoản</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/profile" className="menu-item" onClick={() => setIsOpen(false)}>
                                    <i className="fa-solid fa-id-card"></i>
                                    <span>Hồ sơ cá nhân</span>
                                </Link>
                                <Link to="/saved-articles" className="menu-item" onClick={() => setIsOpen(false)}>
                                    <i className="fa-solid fa-bookmark"></i> Bài đã lưu
                                </Link>
                                <Link to="/changepassword" className="menu-item" onClick={() => setIsOpen(false)}>
                                    <i className="fa-solid fa-key"></i>
                                    <span>Đổi mật khẩu</span>
                                </Link>
                                <div className="menu-item" onClick={logout}>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>Đăng xuất</span>
                                </div>
                            </>
                        )}

                        <Link to="/vip" className="menu-item vip-item" onClick={() => setIsOpen(false)}>
                            <i className="fa-regular fa-gem"></i>
                            <span>Nâng cấp VIP</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerticalMenu;