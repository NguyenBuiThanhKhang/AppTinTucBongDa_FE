import MainMenu from './component/MainMenu';
import AppRouter from "./router/AppRouter";
import logoBongDa from './assets/logo.png';
import './App.css';
import MatchHistory from "@/component/timelineHistory/MatchHistory.tsx";
import LinkOfProject from "@/utils/LinkOfProject.tsx";
import VerticalMenu from "@/component/VerticalMenu.tsx";


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
                <LinkOfProject tyeLink={"bootstrap"}/>
                <LinkOfProject tyeLink={"fontawesome"}/>
                <link rel="stylesheet" href="/src/scss/GeneralStyle.css"/>
            </header>
            <div className="container" style={{display: 'flex'}}>
                <div className="vMenu">
                    <VerticalMenu/>
                </div>
                <div className="content">
                    <MainMenu />
                    <MatchHistory/>
                    <AppRouter/>
                </div>
            </div>

        </div>
    );
}

export default App;