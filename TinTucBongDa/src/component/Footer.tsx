import { Link } from 'react-router-dom';
import './css/Footer.css';
import logoBongDa from '../assets/logo.png'; 

const Footer = () => {
    return (
        <footer className="footer-simple">
            <div className="footer-wrapper">
                
                <div className="footer-top-bar">
                    <div className="footer-links-row">
                        <Link to="#">Điều khoản sử dụng</Link>
                        <span className="divider">|</span>
                        <Link to="#">Chính sách bảo mật</Link>
                        <span className="divider">|</span>
                        <Link to="#">Cookies</Link>
                    </div>
                    <div className="footer-socials">
                        <span>Theo dõi Goalpost trên</span>
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-youtube-play"></i></a>
                    </div>
                </div>

                {/* DÒNG 2: Thông tin chính */}
                <div className="footer-main-info">
                    
                    {/* Cột 1: Giới thiệu & Giấy phép */}
                    <div className="info-col left">
                        <div className="brand-header">
                            <img src={logoBongDa} alt="Logo" className="footer-logo-small" />
                            <strong>Báo thể thao hàng đầu Việt Nam</strong>
                        </div>
                        <p>Thuộc Bộ Khoa học và Công nghệ</p>
                        <p>Số giấy phép: 548/GP-BTTTT cấp ngày 24/08/2021</p>
                    </div>

                    {/* Cột 2: Liên hệ */}
                    <div className="info-col middle">
                        <p><strong>Tổng biên tập:</strong> Nguyễn Văn A</p>
                        <p><strong>Địa chỉ:</strong> Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh</p>
                        <p><strong>Điện thoại:</strong> 024 7300 8899 - máy lẻ 4500</p>
                        <p><strong>Email:</strong> contact@goalpost.vn</p>
                    </div>

                    {/* Cột 3: Bản quyền */}
                    <div className="info-col right">
                        <p>&copy; 1997-2026. Toàn bộ bản quyền thuộc Goalpost Journal</p>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;