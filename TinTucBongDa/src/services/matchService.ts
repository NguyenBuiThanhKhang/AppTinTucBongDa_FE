// src/services/matchService.ts
import type {Match} from "../utils/types";

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
];

const URL = 'http://localhost:5000/api/matches?limit=10';
const getData = async (): Promise<Match[]> => {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            return data;
        }
        if (data && typeof data === 'object') {

            if (Array.isArray(data.data)) {
                return data.data;
            }
            if (Array.isArray(data.matches)) {
                return data.matches;
            }
            if (Array.isArray(data.results)) {
                return data.results;
            }
            if (Array.isArray(data.items)) {
                return data.items;
            }
        }

        throw new Error("API response is not an array");
    } catch (fetchError) {
        throw fetchError;
    }
};


export const getHistoryMatches = async (): Promise<Match[]> => {
    try {
        const realData = await getData();
        if (Array.isArray(realData) && realData.length > 0) {
            return realData;
        }
        return MOCK_DATA;

    } catch (error) {
        console.warn("Lấy data Mock. Lỗi:", error);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA);
            }, 500);
        });
    }
};