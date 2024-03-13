import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    refreshToken: null,
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
        },
        removeUser(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;