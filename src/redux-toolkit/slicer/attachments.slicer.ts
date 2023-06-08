import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    value: []
}

export const PhilosophySlice = createSlice({
    name: 'attachments',
    initialState,
    reducers: {
        saveAttachments: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
        }
    }
});

export const { saveAttachments } = PhilosophySlice.actions;
export default PhilosophySlice.reducer;