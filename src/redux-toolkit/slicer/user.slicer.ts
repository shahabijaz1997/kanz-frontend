import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../../interfaces/redux/redux.interface";

const initialState: Data = {
    value: {}
}

export const UserSlice = createSlice({
    name: 'userData',
    initialState: {
        userData: initialState,
        userMetaData: initialState
      },
    reducers: {
        saveUserData: (state, action: PayloadAction<String>) => {
            state.userData.value = action.payload;
        },
        saveUserMetaData: (state, action: PayloadAction<String>) => {
            state.userMetaData.value = action.payload;
        }
    }
});

export const { saveUserData, saveUserMetaData } = UserSlice.actions;
export default UserSlice.reducer;