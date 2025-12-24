import MainMenu from './component/MainMenu';
import HomePage from './component/HomePage';
import logoBongDa from './assets/logo.png';
import './App.css';
import NewspaperDetail, {staticValueND} from "./pages/NewspaperDetail.tsx";

function App() {
    const sv = staticValueND;
    return (
        // <div className="App">
        //     <header style={{
        //         textAlign: 'center',
        //         overflow: 'hidden', /* Cắt bớt phần thừa nếu bị lòi ra ngoài */
        //         height: '100px',    /* Ép chiều cao của header cố định là 100px (hoặc số bạn muốn) */
        //         display: 'flex',    /* Dùng Flexbox để căn chỉnh */
        //         alignItems: 'center',
        //         justifyContent: 'center'
        //     }}>
        //         <img
        //             src={logoBongDa}
        //             alt="Logo Bongda"
        //             style={{
        //                 height: '200px',     /* Phóng to ảnh lên (vì ảnh gốc nhiều khoảng trắng nên phải phóng to mới thấy chữ) */
        //                 marginTop: '-50px',  /* Kéo ảnh ngược lên trên để giấu khoảng trắng trên */
        //                 // marginBottom không cần thiết nếu header đã set height cố định
        //             }}
        //         />
        //     </header>
        //
        //     <MainMenu />
        //
        //     <HomePage />
        //
        // </div>
        <NewspaperDetail title={sv.title} introduction={sv.introduction} content={sv.content} rate={sv.rate} listComment={sv.listComment}/>
    );
}

export default App;