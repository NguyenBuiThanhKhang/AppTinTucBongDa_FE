import { useEffect, useState } from 'react';
import { getHistoryMatches } from '../../services/matchService.ts';
import type { Match } from '../../utils/typesMatch.ts';
import {useNavigate} from 'react-router-dom';
import '../css/MatchHistory.css';

const MatchHistory = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const navigate = useNavigate();

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
    const handleMatchClick = (match: Match) => {
        // const status  = match.status === 'FINISHED' ;
        const status  = false ;
        if(status) {
            navigate(`match/detail/${match.api_id}`, { state: { matchData: match } });
        } else {
            navigate(`match/predict/${match.api_id}`, { state: { matchData: match } });
        }
    }
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

                    return (
                        <div key={match.api_id} className="match-card" onClick={() => handleMatchClick(match)}>
                            <div className="team home">
                                <span>{match.home_team.name}</span>
                                <img
                                    src={match.home_team.logo}
                                    alt="home"
                                    width="30"
                                />
                            </div>

                            <div className="score-box">
                                <span className="score">
                                    {match.score.home} - {match.score.away}
                                </span>
                                <span className="date">
                                    {formatDate(match.match_date)}
                                </span>
                            </div>

                            <div className="team away">
                                <img
                                    src={match.away_team.logo}
                                    alt="away"
                                    width="30"
                                />
                                <span>{match.away_team.name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MatchHistory;
