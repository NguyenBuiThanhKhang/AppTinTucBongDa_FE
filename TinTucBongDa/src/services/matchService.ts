// src/services/matchService.ts
// src/services/matchService.ts
import type {Match} from "../utils/types";

// 1. Dữ liệu giả (Copy y hệt cấu trúc bạn đã test bên Python)
const MOCK_DATA: Match[] = [
    {
        api_id: 1,
        competition: "Premier League",
        season: "2025",
        match_date: "2025-08-15T19:00:00Z",
        status: "FINISHED",
        home_team: { name: "Man Utd", logo: "https://crests.football-data.org/66.png" },
        away_team: { name: "Newcastle", logo: "https://crests.football-data.org/67.png" },
        score: { home: 3, away: 1 }
    },
    {
        api_id: 2,
        competition: "La Liga",
        season: "2025",
        match_date: "2025-08-16T21:00:00Z",
        status: "FINISHED",
        home_team: { name: "Real Madrid", logo: "https://crests.football-data.org/86.png" },
        away_team: { name: "Barcelona", logo: "https://crests.football-data.org/81.png" },
        score: { home: 2, away: 2 }
    },
    // ... Bạn có thể copy thêm vài trận nữa vào đây
];

// 2. Hàm giả lập gọi API
export const getHistoryMatches = (): Promise<Match[]> => {
    return new Promise((resolve) => {
        // Giả vờ đợi 1 giây (1000ms) rồi mới trả dữ liệu
        setTimeout(() => {
            resolve(MOCK_DATA);
        }, 1000);
    });
};