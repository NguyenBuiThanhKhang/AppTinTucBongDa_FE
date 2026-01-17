import type { Match } from '../../utils/typesMatch.ts';
import '@/scss/guessPage/PredictScore.scss';
import { useDispatch ,useSelector} from 'react-redux';
import type {RootState} from '../../redux/store';
import { setScores } from '../../redux/predictionSlice';
interface Props {
    match: Match;
}

const PredictScore = ({ match }: Props) => {
    const dispatch = useDispatch();
    const { homeScore, awayScore } = useSelector((state: RootState) => state.prediction)

    const handleChange = (type: 'home' | 'away', value: string) => {
        const num = value === '' ? 0 : parseInt(value);
        dispatch(setScores({
            home: type === 'home' ? num: (homeScore || 0),
            away: type === 'away' ? num: (awayScore || 0)
        }));
    };
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('vi-VN');
    };

    return (
        <div className="pridict-score-container">
            <div className="home-team-container">
                <img src={match.home_team.logo} alt="home-team"/>
                <span> {match.home_team.name}</span>
                <input type="number" min={0} className="socre-home-team"
                       onChange={(e) => handleChange('home', e.target.value)}/>
            </div>

            <div className="infor-match">
                <div className="type-competition">{match.competition}</div>
                <div className="time">{formatDateTime(match.match_date)}</div>
            </div>

            <div className="home-away-container">
                <img src={match.away_team.logo} alt="away-team"/>
                <span> {match.away_team.name}</span>
                <input type="number" min={0} className="socre-away-team"
                onChange={(e) => handleChange('away', e.target.value)}/>
            </div>
        </div>
    );
};

export default PredictScore;