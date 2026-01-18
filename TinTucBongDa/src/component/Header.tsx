import VerticalMenu from "./VerticalMenu";
import logoBongDa from '../assets/logo.png';
import '../scss/Header.scss'; // Nhớ import file SCSS vào đây

function Header() {
    return (
        <header className="app-header">
            {/* Class 'container' lấy từ Bootstrap để căn lề chuẩn với nội dung dưới */}
            <div className="container header-container">

                {/* Phần Trái */}
                <div className="header-section left">
                    <div className="hamburger-btn">
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>

                {/* Phần Giữa (Logo) */}
                <div className="header-section center">
                    <img src={logoBongDa} alt="Logo" className="header-logo-img" />
                </div>

                {/* Phần Phải (User) */}
                <div className="header-section right">
                    <VerticalMenu />
                </div>

            </div>
        </header>
    );
}

export default Header;