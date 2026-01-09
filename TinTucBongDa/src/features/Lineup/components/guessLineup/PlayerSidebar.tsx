import type { Player } from "@/utils/typesLineup";
import { PLAYERS_DATA } from '../../services/lineupService';

interface Props {
    onSelect: (player: Player) => void;
    isVisible: boolean;
}

export const PlayerSidebar = ({ onSelect, isVisible }:Props) => {
    if (!isVisible) return null;

    return (
        <div className="player-sidebar-container">
            <h3 className="player-sidebar-title">Chọn cầu thủ</h3>

            <div className="player-list">
                {PLAYERS_DATA.map((player) => (
                    <div
                        key={player.id}
                        onClick={() => onSelect(player)}
                        className="player-item"
                    >
                        <img 
                            src={player.avatar} 
                            alt={player.name} 
                            className="player-item-avatar" 
                        />
                        <div className="player-item-info">
                            <p className="player-item-name">{player.name}</p>
                            <p className="player-item-details">{player.club} - Số {player.number}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};