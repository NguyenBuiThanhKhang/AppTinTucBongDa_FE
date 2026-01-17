export interface Player {
    id: string;
    name: string;
    number: number;
    club: string;
    avatar: string;
}

export interface FormLineUp {
    DF: number;
    MF: number;
    FW: number;
}

export type SlotID = string;

export interface LineupState {
    [key: SlotID]: Player | null;
}