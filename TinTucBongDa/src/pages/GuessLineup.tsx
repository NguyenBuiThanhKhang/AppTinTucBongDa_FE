import { useState } from 'react';
import type {FormLineUp, LineupState, Player, SlotID} from '../utils/typesLineup';
import { FootballPitch } from '../component/guessLineup/FootballPitch';
import { FormationForm } from '../component/guessLineup/FormationForm';
import { PlayerSidebar } from '../component/guessLineup/PlayerSidebar';
import '@/scss/guessLineup/GuessLineup.scss';

const GuessLineup = () => {
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
            <h1 className="guess-lineup-title">Dự Đoán Đội Hình</h1>
            <p className="guess-lineup-subtitle">Chọn đội hình và sắp xếp cầu thủ trên sân</p>

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