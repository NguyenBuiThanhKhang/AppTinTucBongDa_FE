import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainMenu from './component/MainMenu';
import HomePage from './component/HomePage';
import MatchHistory from './component/MatchHistory';
import logoBongDa from './assets/logo.png';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header style={{
                    textAlign: 'center',
                    overflow: 'hidden',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        src={logoBongDa}
                        alt="Logo Bongda"
                        style={{
                            height: '180px',
                            objectFit: 'contain'
                        }}
                    />
                </header>

                <MainMenu/>

                <MatchHistory />

                <Routes>
                    <Route path="/" element={<HomePage/>}/>

                    <Route path="/:slug" element={<div style={{padding: 20}}>Đang phát triển trang danh mục...</div>}/>
                    <Route path="/category/:id/:slug"
                           element={<div style={{padding: 20}}>Đang phát triển trang chi tiết...</div>}/>
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;