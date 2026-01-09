import AppRouter from "./router/AppRouter";
import logoBongDa from './assets/logo.png';
import './App.css';
import MainMenu from "./layouts/MainMenu";
import Footer from "./layouts/Footer";

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
            <Footer />
        </div>
    );
}

export default App;