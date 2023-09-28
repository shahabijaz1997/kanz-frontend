import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../interfaces/redux/redux.interface";

const initialState: Data = {
    value: ""
}

export const saveDataHolderSlice = createSlice({
    name: 'datHolder',
    initialState,
    reducers: {
        saveDataHolder: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
        }
    }
});

export const { saveDataHolder } = saveDataHolderSlice.actions;
export default saveDataHolderSlice.reducer;