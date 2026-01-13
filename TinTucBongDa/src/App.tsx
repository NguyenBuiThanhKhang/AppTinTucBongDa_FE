import MainMenu from './component/MainMenu';
import AppRouter from "./router/AppRouter";
import MatchHistory from './component/timelineHistory/MatchHistory.tsx';
import logoBongDa from './assets/logo.png';
import Footer from './component/Footer';
import './App.css';

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
            <AppRouter />
            <Footer />
        </div>
    );
}

export default App;