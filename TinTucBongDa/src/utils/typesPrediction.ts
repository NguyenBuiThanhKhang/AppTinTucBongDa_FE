import type {FormLineUp, LineupState} from './typesLineup';

export interface Prediction {
    matchId: number | null;
    homeScore: number | null;
    awayScore: number | null;
    form: FormLineUp;
    lineup: LineupState;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface SavePayload {
    matchId: number;
    userId: string;
    prediction: {
        homeScore: number;
        awayScore: number;
        formation: string;
        lineup: {
            slotId: string;
            playerId: string;
        }[];
    };
}