import type { FormLineUp } from "@/utils/typesLineup";
import { useState } from 'react';

interface Props {
    currentConfig: FormLineUp;
    onConfirm: (newConfig: FormLineUp) => void;
}

export const FormationForm= ({ currentConfig, onConfirm }:Props) => {

    const [draft, setDraft] = useState<FormLineUp>(currentConfig);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const total = draft.DF + draft.MF + draft.FW;
        if (total !== 10) {
            setError(`Tổng phải là 10 (Hiện tại: ${total})`);
            return;
        }
        if (draft.DF > 5 || draft.MF > 5 || draft.FW > 5) {
            setError('Mỗi hàng tối đa 5 người');
            return;
        }
        setError('');
        onConfirm(draft);
    };


    const handleChange = (field: keyof FormLineUp, val: number) => {
        setDraft({ ...draft, [field]: val });
    };

    return (
        <div className="formation-form-container">
            <h3 className="formation-form-title">Nhập sơ đồ đội hình (Tổng = 10)</h3>
            <div className="formation-inputs">
                <div className="formation-input-group">
                    <label>Hậu vệ (DF)</label>
                    <input 
                        type="number" 
                        min="0"
                        max="5"
                        value={draft.DF} 
                        onChange={(e) => handleChange('DF', Number(e.target.value))} 
                    />
                </div>
                <div className="formation-input-group">
                    <label>Tiền vệ (MF)</label>
                    <input 
                        type="number" 
                        min="0"
                        max="5"
                        value={draft.MF} 
                        onChange={(e) => handleChange('MF', Number(e.target.value))} 
                    />
                </div>
                <div className="formation-input-group">
                    <label>Tiền đạo (FW)</label>
                    <input 
                        type="number" 
                        min="0"
                        max="5"
                        value={draft.FW} 
                        onChange={(e) => handleChange('FW', Number(e.target.value))} 
                    />
                </div>
            </div>

            {error && <div className="formation-error">{error}</div>}

            <button onClick={handleSubmit} className="formation-submit-btn">
                Vẽ đội hình
            </button>
        </div>
    );
};