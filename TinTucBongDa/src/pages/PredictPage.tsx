import { useLocation, useNavigate } from 'react-router-dom';
import type { Match } from '../utils/typesMatch.ts';
import PredictScore from '../component/matchDetail/PredictScore';
import GuessLineup from '../component/guessLineup/GuessLineup';
import '@/scss/guessPage/PredictPage.scss';
const PredictPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const match = location.state?.matchData as Match | undefined;
    if (!match) {
        return (
            <div className="error-container">
                <p>Không tìm thấy thông tin trận đấu.</p>
                <button onClick={() => navigate(-1)}>Quay lại danh sách</button>
            </div>
        );
    }

    return (
        <div className="predict-page-wrapper">
            <header className="page-header">
                <h1>Góc Dự Đoán</h1>
                <p className="match-info">
                    {match.home_team.name} <span className="vs">vs</span> {match.away_team.name}
                </p>
            </header>

            <div className="main-content">
                <section className="section-container">
                    <h2 className="section-title">1. Dự đoán Tỉ số</h2>
                    <PredictScore match={match} />
                </section>
                <section className="section-container">
                    <h2 className="section-title">2. Dự đoán Đội hình ra sân</h2>
                    <GuessLineup match={match} />
                </section>
            </div>
        </div>
    );
};

export default PredictPage;