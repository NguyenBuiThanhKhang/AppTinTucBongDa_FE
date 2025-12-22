import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import thêm cái này
import MainMenu from './component/MainMenu';
import HomePage from './component/HomePage';
import logoBongDa from './assets/logo.png';
import './App.css';

function App() {
    return (
        // QUAN TRỌNG: Phải bọc BrowserRouter ở ngoài cùng
        <BrowserRouter>
            <div className="App">
                <header style={{
                    textAlign: 'center',
                    overflow: 'hidden',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0' // Thêm màu nền nhẹ nếu thích
                }}>
                    <img
                        src={logoBongDa}
                        alt="Logo Bongda"
                        style={{
                            height: '180px', // Chỉnh lại chút cho vừa vặn
                            objectFit: 'contain'
                        }}
                    />
                </header>

                {/* Menu lấy dữ liệu động từ API */}
                <MainMenu />

                {/* Phần nội dung chính (Routing) */}
                <Routes>
                    {/* Trang chủ */}
                    <Route path="/" element={<HomePage />} />

                    {/* Trang danh mục (Placeholder để không lỗi khi bấm menu) */}
                    <Route path="/:slug" element={<div style={{padding: 20}}>Đang phát triển trang danh mục...</div>} />
                    <Route path="/category/:id/:slug" element={<div style={{padding: 20}}>Đang phát triển trang chi tiết...</div>} />
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;