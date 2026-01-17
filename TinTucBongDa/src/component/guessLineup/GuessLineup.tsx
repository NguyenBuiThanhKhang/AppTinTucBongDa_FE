import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { setPlayerToSlot, setFormation } from '../../redux/predictionSlice';
import type { FormLineUp, Player, SlotID } from '../../utils/typesLineup.ts';
import { FootballPitch } from './FootballPitch.tsx';
import { FormationForm } from './FormationForm.tsx';
import { PlayerSidebar } from './PlayerSidebar.tsx';
import '../../scss/guessLineup/GuessLineup.scss';

const GuessLineup = () => {
    const dispatch = useDispatch();
    const { form, lineup } = useSelector((state: RootState) => state.prediction);
    const [selectedSlot, setSelectedSlot] = useState<SlotID | null>(null);

    const handleConfigChange = (newConfig: FormLineUp) => {
        dispatch(setFormation(newConfig));
        setSelectedSlot(null);
    };
    const handleSlotClick = (id: SlotID) => {
        setSelectedSlot(id);
    };
    const handlePlayerSelect = (player: Player) => {
        if (selectedSlot) {
            dispatch(setPlayerToSlot({
                slotId: selectedSlot,
                player: player
            }));

            setSelectedSlot(null);
        }
    };

    return (
        <div className="guess-lineup-container">
            <h1 className="guess-lineup-title">Dự Đoán Đội Hình: </h1>

            <FormationForm
                currentConfig={form}
                onConfirm={handleConfigChange}
            />

            <div className="lineup-main-layout">
                <div className="lineup-pitch-wrapper">
                    <FootballPitch
                        config={form}
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