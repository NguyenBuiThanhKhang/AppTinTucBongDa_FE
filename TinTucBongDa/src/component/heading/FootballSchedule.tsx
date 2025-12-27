import MatchCell, {type Match} from "./MatchCell.tsx";

export type FootballScheduleProps= {
    matchList: Match[];
};
function FootballSchedule({matchList}: FootballScheduleProps){
    return (
        <div className="football-schedule">
            {matchList.map(matchItem => (
                <MatchCell match={matchItem}/>
            ))}
        </div>
    )
}
export default FootballSchedule;