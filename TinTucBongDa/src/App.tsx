import MainMenu from './component/MainMenu';
import AppRouter from "./router/AppRouter";
import MatchHistory from './component/timelineHistory/MatchHistory.tsx';
import logoBongDa from './assets/logo.png';
import Footer from './component/Footer';
import './App.css';

import CategoryPage from './pages/CategoryPage';
import MultimediaPage from './pages/MultimediaPage';
import PredictPage from './pages/PredictPage';

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
                    <Route path="/match/detail/:id"> </Route>
                    <Route path="/match/predict/:id" element={<PredictPage/>}> </Route>
                </Routes>

        </div>
    );
}

export default App;