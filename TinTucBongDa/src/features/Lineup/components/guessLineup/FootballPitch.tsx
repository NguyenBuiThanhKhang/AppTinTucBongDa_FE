import type { FormLineUp, LineupState, SlotID } from "@/utils/typesLineup";
import { PlayerNode } from './PlayerNode';

interface Props {
    config: FormLineUp;
    lineup: LineupState;
    selectedSlot: SlotID | null;
    onSlotClick: (id: SlotID) => void;
}

export const FootballPitch = ({ config, lineup, selectedSlot, onSlotClick }: Props) => {

    const renderRow = (count: number, role: string) => {
        return (
            <div className="pitch-row">
                {Array.from({ length: count }).map((_, index) => {
                    const slotId = `${role}-${index}`;
                    return (
                        <PlayerNode
                            key={slotId}
                            label={slotId}
                            player={lineup[slotId]}
                            isSelected={selectedSlot === slotId}
                            onClick={() => onSlotClick(slotId)}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="pitch-container">
            {/* Tiền Đạo */}
            {renderRow(config.FW, 'FW')}

            {/* Tiền Vệ */}
            {renderRow(config.MF, 'MF')}

            {/* Hậu Vệ */}
            {renderRow(config.DF, 'DF')}

            {/* Thủ Môn */}
            <div className="pitch-row" style={{ justifyContent: 'center' }}>
                <PlayerNode
                    label="GK-0"
                    player={lineup['GK-0']}
                    isSelected={selectedSlot === 'GK-0'}
                    onClick={() => onSlotClick('GK-0')}
                />
            </div>
        </div>
    );
};