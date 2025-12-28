import { useEffect, useState } from 'react';
import { getHistoryMatches } from '../services/matchService';
import type { Match } from '../utils/types';
import './css/MatchHistory.css';

const MatchHistory = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getHistoryMatches();
                if (Array.isArray(data)) {
                    setMatches(data);
                } else {
                    setMatches([]);
                }
            } catch (error) {
                console.error(error);
                setMatches([]);
            }
        }

        fetchData();
    }, []);

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'N/A';
        }
        return date.toLocaleDateString('vi-VN');
    }

    return (
        <div className="match-history-container">
            <div className="match-list">
                {matches.map((match) => {
                    const homeName = match.home_team ? match.home_team.name : 'N/A';
                    const homeLogo =
                        match.home_team && match.home_team.logo
                            ? match.home_team.logo
                            : 'https://via.placeholder.com/30';

                    const awayName = match.away_team ? match.away_team.name : 'N/A';
                    const awayLogo =
                        match.away_team && match.away_team.logo
                            ? match.away_team.logo
                            : 'https://via.placeholder.com/30';

                    const homeScore =
                        match.score && match.score.home !== undefined
                            ? match.score.home
                            : 0;

                    const awayScore =
                        match.score && match.score.away !== undefined
                            ? match.score.away
                            : 0;

                    return (
                        <div key={match.api_id} className="match-card">
                            <div className="team home">
                                <span>{homeName}</span>
                                <img
                                    src={homeLogo}
                                    alt="home"
                                    width="30"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/30';
                                    }}
                                />
                            </div>

                            <div className="score-box">
                                <span className="score">
                                    {homeScore} - {awayScore}
                                </span>
                                <span className="date">
                                    {formatDate(match.match_date)}
                                </span>
                            </div>

                            <div className="team away">
                                <img
                                    src={awayLogo}
                                    alt="away"
                                    width="30"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/30';
                                    }}
                                />
                                <span>{awayName}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MatchHistory;
