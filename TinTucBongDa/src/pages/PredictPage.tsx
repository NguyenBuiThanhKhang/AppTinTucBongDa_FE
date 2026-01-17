import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { Match } from './../utils/typesMatch';
import type { RootState } from './../redux/store';
import {resetPrediction, setMatchId,savePrediction} from './../redux/predictionSlice';
import PredictScore from '../component/matchDetail/PredictScore';
import GuessLineup from '../component/guessLineup/GuessLineup';

import '@/scss/guessPage/PredictPage.scss';

const PredictPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const match: Match | undefined = location.state?.matchData;

    const predictionState = useSelector(
        (state: RootState) => state.prediction
    );
    const {homeScore, awayScore, form, lineup, status} = predictionState;
    useEffect(() => {
        if (!match) return;
        dispatch(resetPrediction());
        dispatch(setMatchId(match.api_id));
    }, [match, dispatch]);
    const handleSave = () => {
        if (!match) return;
        const currentUserId = localStorage.getItem("userId");
        if (!currentUserId) {
            alert("Bạn cần đăng nhập để thực hiện dự đoán!");
            navigate("/login");
            return;
        }
        if (homeScore === null || awayScore === null) {
            alert("Vui lòng nhập dự đoán tỉ số!");
            return;
        }

        const formattedLineup = Object.entries(lineup)
            .filter(([, player]) => player !== null)
            .map(([slotKey, player]) => ({
                slotId: slotKey,
                playerId: player!.id
            }));

        const predictionData = {
            matchId: match.api_id,
            userId: currentUserId,
            prediction: {
                homeScore,
                awayScore,
                formation: `${form.DF}-${form.MF}-${form.FW}`,
                lineup: formattedLineup
            }
        };
        dispatch(savePrediction(predictionData) as any)
            .unwrap()
            .then(() => {
                alert("Lưu dự đoán thành công!");
                navigate(-1);
            })
            .catch((err: any) => {
                console.error(err);
                alert(`Lỗi khi lưu: ${err}`);
            });
    };
    if (!match) {
        return (
            <div className="error-container">
                <p>Không tìm thấy thông tin trận đấu.</p>
                <button onClick={() => navigate(-1)}>
                    Quay lại
                </button>
            </div>
        );
    }
    return (
        <div className="predict-page-wrapper">
            <header className="page-header">
                <h1>Góc Dự Đoán</h1>
                <p className="match-info">
                    {match.home_team.name}
                    <span className="vs"> vs </span>
                    {match.away_team.name}
                </p>
            </header>

            <div className="main-content">
                <section className="section-container">
                    <h2>1. Dự đoán tỉ số</h2>
                    <PredictScore match={match} />
                </section>

                <section className="section-container">
                    <h2>2. Dự đoán đội hình</h2>
                    <GuessLineup />
                </section>
            </div>

            <div className="action-footer">
                <button
                    className="btn-save-prediction"
                    onClick={handleSave}
                    disabled={status === 'loading'}
                >
                    {status === 'loading'
                        ? 'Đang lưu...'
                        : 'XÁC NHẬN DỰ ĐOÁN'}
                </button>
            </div>
        </div>
    );
};

export default PredictPage;
