import MainMenu from './component/MainMenu';
import HomePage from './component/HomePage';
import MatchHistory from './component/timelineHistory/MatchHistory.tsx';
import logoBongDa from './assets/logo.png';
import './App.css';
import AppRouter from "./router/AppRouter.tsx";
import {Route, Routes} from "react-router-dom";
import CategoryPage from './pages/CategoryPage';
import MultimediaPage from './pages/MultimediaPage';

function App() {
    return (
        <div className="App">
            <header style={{
                textAlign: 'center',
                overflow: 'hidden', 
                height: '100px',    
                display: 'flex',    
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    src={logoBongDa}
                    alt="Logo Bongda"
                    style={{
                        height: '200px',   
                        marginTop: '-50px',  
                    }}
                />
            </header>

            <MainMenu />

            <AppRouter />

                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/:slug" element={<CategoryPage />} />
                    <Route path="/multimedia" element={<MultimediaPage />} />
                </Routes>
        </div>
    );
}

export default App;