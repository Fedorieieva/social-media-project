import React from "react";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userToken: '',
    user: {},
    loader: true
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        actionSetUserData: (state, {payload}) => {
            state.user = payload;
            console.log(state.user);
        },
        actionSetUserToken: (state, {payload}) => {
            state.userToken = payload;
        },
        actionUserLoader: (state, {payload}) => {
            state.loader = payload;
        },
        actionClearUserData: (state) => {
            state.user = {};
            state.userToken = '';
        }
    }
});


export const {
    actionSetUserData,
    actionUserLoader,
    actionSetUserToken,
    actionClearUserData
} = userSlice.actions;
export default userSlice.reducer;
