import type { Player } from '../../utils/typesLineup'

interface Props {
    player: Player | null;
    label: string;
    onClick: () => void;
    isSelected: boolean;
}

export const PlayerNode = ({ player, onClick, isSelected }:Props) => {
    return (
        <div
            onClick={onClick}
            className={`player-node ${isSelected ? 'selected' : ''}`}
        >
            {player ? (
                <>
                    <img src={player.avatar} alt={player.name} className="player-avatar" />
                    <span className="player-name">{player.name}</span>
                </>
            ) : (
                <div className="empty-node">+</div>
            )}
        </div>
    );
};