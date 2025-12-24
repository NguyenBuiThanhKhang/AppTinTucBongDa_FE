// src/component/MatchHistory.tsx
import { useEffect, useState } from 'react';
import { getHistoryMatches } from '../services/matchService'; // Import service giả
import type {Match} from '../utils/types';
import './css/MatchHistory.css';

const MatchHistory = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi hàm giả lập như gọi thật
                const data = await getHistoryMatches();
                setMatches(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>⏳ Đang tải lịch sử đấu...</div>;

    return (
        <div className="match-history-container">
            <h3>Kết quả thi đấu</h3>
            <div className="match-list">
                {matches.map((match) => (
                    <div key={match.api_id} className="match-card">
                        {/* Đội nhà */}
                        <div className="team home">
                            <span>{match.home_team.name}</span>
                            <img src={match.home_team.logo} alt="home" width="30" />
                        </div>

                        {/* Tỷ số */}
                        <div className="score-box">
              <span className="score">
                {match.score.home} - {match.score.away}
              </span>
                            <span className="date">
                 {/* Format ngày tháng */}
                                {new Date(match.match_date).toLocaleDateString('vi-VN')}
              </span>
                        </div>

                        {/* Đội khách */}
                        <div className="team away">
                            <img src={match.away_team.logo} alt="away" width="30" />
                            <span>{match.away_team.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatchHistory;