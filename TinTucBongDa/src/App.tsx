import MainMenu from './component/MainMenu';
import HomePage from './component/HomePage';
import MatchHistory from './component/MatchHistory';
import logoBongDa from './assets/logo.png';
import './App.css';
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

                <MatchHistory />

                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/:slug" element={<CategoryPage />} />
                    <Route path="/multimedia" element={<MultimediaPage />} />
                </Routes>
        </div>
    );
}

export default App;