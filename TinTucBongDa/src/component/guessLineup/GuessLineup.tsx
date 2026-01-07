import { useState } from 'react';
import type { Match } from '../../utils/typesMatch.ts';
import type { FormLineUp, LineupState, Player, SlotID } from '../../utils/typesLineup.ts';
import { FootballPitch } from './FootballPitch.tsx';
import { FormationForm } from './FormationForm.tsx';
import { PlayerSidebar } from './PlayerSidebar.tsx';
import '@/scss/guessLineup/GuessLineup.scss';

interface GuessLineupProps {
    match: Match;
}
const GuessLineup = ({ match }: GuessLineupProps) => {
    const [config, setConfig] = useState<FormLineUp>({ DF: 4, MF: 5, FW: 1 });
    const [lineup, setLineup] = useState<LineupState>({});
    const [selectedSlot, setSelectedSlot] = useState<SlotID | null>(null);

    // Hàm cập nhập khi người dùng thay đổi cấu trúc đội hình
    const handleConfigChange = (newConfig: FormLineUp) => {
        setConfig(newConfig);
        setSelectedSlot(null);
    };
    // Ghi nhớ vị trí được chọn để cb cập nhập
    const handleSlotClick = (id: SlotID) => {
        setSelectedSlot(id);
    };
    // Gán cầu thủ vào vị trí đã chọn
    const handlePlayerSelect = (player: Player) => {
        if (selectedSlot) {
            setLineup((prev) => ({
                ...prev,
                [selectedSlot]: player
            }));
            setSelectedSlot(null);
        }
    };

    return (
        <div className="guess-lineup-container">
            <h1 className="guess-lineup-title">Dự Đoán Đội Hình: {match.home_team.name}</h1>

            <FormationForm currentConfig={config} onConfirm={handleConfigChange} />

            <div className="lineup-main-layout">
                <div className="lineup-pitch-wrapper">
                    <FootballPitch
                        config={config}
                        lineup={lineup}
                        selectedSlot={selectedSlot}
                        onSlotClick={handleSlotClick}
                    />
                </div>
                <PlayerSidebar
                    isVisible={!!selectedSlot}
                    onSelect={handlePlayerSelect}
                />
            </div>
        </div>
    );
};

export default GuessLineup;