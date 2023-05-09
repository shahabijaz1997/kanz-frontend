import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/redux/redux.interface";

const initialState: User = {
    value: {}
}

export const UserSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        saveUserData: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
        }
    }
});

export const { saveUserData } = UserSlice.actions;
export default UserSlice.reducer;