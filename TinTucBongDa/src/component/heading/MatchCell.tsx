
type Team = {
    name: string;
    logo: string;
};

export type Match = {
    date: string;
    time: string;
    home: Team;
    away: Team;
};

type MatchCellProps = {
    match: Match;
};

function MatchCell({ match }: MatchCellProps) {
    return (
        <div className="match-cell">
            <div className="match-time">
                <span className="match-date">{match.date}</span>
                <span className="match-hour">{match.time}</span>
            </div>

            <div className="match-teams">
                <div className="team home">
                    <img src={match.home.logo} alt={match.home.name} />
                    <span>{match.home.name}</span>
                </div>

                <span className="match-score">-</span>

                <div className="team away">
                    <img src={match.away.logo} alt={match.away.name} />
                    <span>{match.away.name}</span>
                </div>
            </div>
        </div>
    );
}

export default MatchCell;