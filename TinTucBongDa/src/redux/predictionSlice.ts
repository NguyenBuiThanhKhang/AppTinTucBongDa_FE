import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { Prediction, SavePayload } from '../utils/typesPrediction'
import type { FormLineUp, Player, SlotID } from '../utils/typesLineup'

const initialState: Prediction = {
    matchId: null,
    homeScore: null,
    awayScore: null,
    form: { DF: 4, MF: 5, FW: 1 },
    lineup: {},
    status: 'idle',
    error: null
}

export const savePrediction = createAsyncThunk(
    'prediction/save',
    async (data: SavePayload, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/predictions',
                data
            )
            return res.data
        } catch (error: any) {
            return rejectWithValue('Không thể lưu dự đoán')
        }
    }
)

const predictionSlice = createSlice({
    name: 'prediction',
    initialState,

    reducers: {
        setMatchId(state, action: PayloadAction<number>) {
            state.matchId = action.payload
        },
        setScores(state, action: PayloadAction<{ home: number; away: number }>) {
            state.homeScore = action.payload.home
            state.awayScore = action.payload.away
        },
        setFormation(state, action: PayloadAction<FormLineUp>) {
            state.form = action.payload
        },
        setPlayerToSlot(state, action: PayloadAction<{ slotId: SlotID; player: Player }>) {
            const { slotId, player } = action.payload
            state.lineup[slotId] = player
        },

        resetPrediction() {
            return initialState
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(savePrediction.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(savePrediction.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(savePrediction.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
    }
})

export const {
    setMatchId,
    setScores,
    setFormation,
    setPlayerToSlot,
    resetPrediction
} = predictionSlice.actions

export default predictionSlice.reducer