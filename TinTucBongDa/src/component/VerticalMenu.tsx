import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function VerticalMenu() {
    const [urlAvatar] = useState("src/assets/img/imgNull/nullAvtAccount.png");

    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem("username");
    });

    const [isOpen, setIsOpen] = useState(true); // menu show/hide

    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem("userId"));

    const logout = () => {
        localStorage.clear();
        setUsername(null);   // UI update
        navigate("/");
    };

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={`vertical-menu ${isOpen ? "open-vertical-menu" : "closed-vertical-menu"}`}>
            <div className="button-show">
                <button onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            <div className="account">
                <div className="avatar">
                    <div className="img-avt">
                        <img src={urlAvatar} alt="avr"/>
                    </div>
                    <div className="username">
                        <p>{username || "Khách"}</p>
                    </div>
                </div>

                <div className="features">
                    {!isLoggedIn && (
                        <Link to="/login">
                            <div className="login features-comp">
                                <i className="fa-solid fa-user"></i>
                                <p>Đăng nhập</p>
                            </div>
                        </Link>
                    )}

                    {isLoggedIn && (
                        <>
                            <div className="logout features-comp" onClick={logout}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <p>Đăng xuất</p>
                            </div>

                            <Link to="/changepassword features-comp">
                                <div className="change-password">
                                    <i className="fa-solid fa-key"></i>
                                    <p>Đổi mật khẩu</p>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <Link to="/">
                <div className="premium">
                    <i className="fa-regular fa-gem"></i>
                    <p>Đăng ký VIP</p>
                </div>
            </Link>
        </div>
    );
}

export default VerticalMenu;
