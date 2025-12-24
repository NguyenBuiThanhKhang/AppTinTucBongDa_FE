// src/utils/types.ts

export interface Team {
    name: string;
    logo: string;
    short_name?: string;
}

export interface Match {
    api_id: number;
    competition: string;
    season: string;
    match_date: string; // Dạng chuỗi ISO
    status: string;
    home_team: Team;
    away_team: Team;
    score: {
        home: number;
        away: number;
    };
}