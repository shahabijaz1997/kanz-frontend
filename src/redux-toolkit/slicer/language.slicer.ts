import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../../interfaces/redux/redux.interface";

const initialState: Language = {
    value: {}
}

export const LanguageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        saveLanguage: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
        }
    }
});

export const { saveLanguage } = LanguageSlice.actions;
export default LanguageSlice.reducer;