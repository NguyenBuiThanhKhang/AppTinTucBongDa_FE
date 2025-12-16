import FootballSchedule, {type FootballScheduleProps} from "./FootballSchedule.tsx";

// const matchStatic: Match[] = [
//     {
//         date: "20/05",
//         time: "20:00",
//         home: { name: "Man City", logo: "mancity.png" },
//         away: { name: "Real Madrid", logo: "real.png" }
//     },
//     {
//         date: "21/05",
//         time: "02:00",
//         home: { name: "Arsenal", logo: "arsenal.png" },
//         away: { name: "Bayern", logo: "bayern.png" }
//     },
//     {
//         date: "20/05",
//         time: "20:00",
//         home: { name: "Man City", logo: "mancity.png" },
//         away: { name: "Real Madrid", logo: "real.png" }
//     },
//     {
//         date: "21/05",
//         time: "02:00",
//         home: { name: "Arsenal", logo: "arsenal.png" },
//         away: { name: "Bayern", logo: "bayern.png" }
//     },
//     {
//         date: "20/05",
//         time: "20:00",
//         home: { name: "Man City", logo: "mancity.png" },
//         away: { name: "Real Madrid", logo: "real.png" }
//     },
//     {
//         date: "21/05",
//         time: "02:00",
//         home: { name: "Arsenal", logo: "arsenal.png" },
//         away: { name: "Bayern", logo: "bayern.png" }
//     },
//     {
//         date: "20/05",
//         time: "20:00",
//         home: { name: "Man City", logo: "mancity.png" },
//         away: { name: "Real Madrid", logo: "real.png" }
//     },
//     {
//         date: "21/05",
//         time: "02:00",
//         home: { name: "Arsenal", logo: "arsenal.png" },
//         away: { name: "Bayern", logo: "bayern.png" }
//     }
// ]
type HeadingProps ={
    footballScheduleProps: FootballScheduleProps;
}
function HeadingBasic ({footballScheduleProps}: HeadingProps){
    return (
        <div className="heading-basic">
            <div className="logo-newspaper">
                <img src="kdjskjdka" alt="logo-newspaper"/>
            </div>
            <div className="football-schedule-container">
                <FootballSchedule matchList={footballScheduleProps.matchList}/>
            </div>
        </div>
    )
}

export default HeadingBasic;