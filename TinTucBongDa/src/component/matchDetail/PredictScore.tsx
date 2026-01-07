import type { Match } from '../../utils/typesMatch.ts';
import '@/scss/guessPage/PredictScore.scss';
interface Props {
    match: Match;
}

const PredictScore = ({ match }: Props) => {
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };
    return (
        <div className="pridict-score-container">
            <div className="home-team-container">
                <img src={match.home_team.logo} alt="home-team"/>
                <span> {match.home_team.name}</span>
                <input type="number" className="socre-home-team"/>
            </div>

            <div className="infor-match">
                <div className="type-competition">{match.competition}</div>
                <div className="time">{formatDateTime(match.match_date)}</div>
            </div>

            <div className="home-away-container">
                <img src={match.away_team.logo} alt="away-team"/>
                <span> {match.away_team.name}</span>
                <input type="number" className="socre-away-team"/>
            </div>
        </div>
    );
};

export default PredictScore;