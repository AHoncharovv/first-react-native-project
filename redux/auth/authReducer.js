import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    nickname: null,
    stateChange: false,
    email: null,
    photoURL: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.nickname,
            email: payload.email,
            photoURL: payload.photoURL,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
            // avatar: payload.avatar,
        }),
        authSignOut: () => state,
    }
})