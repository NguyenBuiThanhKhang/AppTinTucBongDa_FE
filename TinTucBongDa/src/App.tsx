import MainMenu from './component/MainMenu';
import HomePage from './component/HomePage';
import MatchHistory from './component/MatchHistory';
import logoBongDa from './assets/logo.png';
import './App.css';
import {Route, Routes} from "react-router-dom";
import CategoryPage from './pages/CategoryPage';

function App() {
    return (
        <div className="App">
            <header style={{
                textAlign: 'center',
                overflow: 'hidden', /* Cắt bớt phần thừa nếu bị lòi ra ngoài */
                height: '100px',    /* Ép chiều cao của header cố định là 100px (hoặc số bạn muốn) */
                display: 'flex',    /* Dùng Flexbox để căn chỉnh */
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    src={logoBongDa}
                    alt="Logo Bongda"
                    style={{
                        height: '200px',     /* Phóng to ảnh lên (vì ảnh gốc nhiều khoảng trắng nên phải phóng to mới thấy chữ) */
                        marginTop: '-50px',  /* Kéo ảnh ngược lên trên để giấu khoảng trắng trên */
                        // marginBottom không cần thiết nếu header đã set height cố định
                    }}
                />
            </header>

            <MainMenu />

                <MatchHistory />

                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/:slug" element={<CategoryPage />} />
                </Routes>
        </div>
    );
}

export default App;