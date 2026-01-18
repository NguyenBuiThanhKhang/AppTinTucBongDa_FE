import MainMenu from './component/MainMenu';
import AppRouter from "./router/AppRouter";
import './App.css';
import LinkOfProject from "@/utils/LinkOfProject.tsx";
import Header from "@/component/Header.tsx";
import MatchHistory from "./component/timelineHistory/MatchHistory.tsx";
import Footer from "@/component/Footer.tsx";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container" style={{ marginTop: '20px' }}>
                <MainMenu />
                <MatchHistory/>
                <AppRouter />
                <Footer />
            </div>
            <LinkOfProject tyeLink={"bootstrap"}/>
            <LinkOfProject tyeLink={"fontawesome"}/>
            <link rel="stylesheet" href="/src/scss/GeneralStyle.css"/>
        </div>
    );
}

export default App;