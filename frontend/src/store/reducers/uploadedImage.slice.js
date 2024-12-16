import React from "react";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    profileImgSrc: '',
    postImgSrc: [],
    loading: false
};

export const uploadImageSlice = createSlice({
    name: 'uploadImage',
    initialState,
    reducers: {
        actionSetProfileImageSrc: (state, {payload}) => {
            state.profileImgSrc = payload;
            console.log('state: ', state.profileImgSrc);
        },
        actionClearProfileImageSrc: (state) => {
            state.profileImgSrc = '';
        },
        actionSetPostImageSrc: (state, {payload}) => {
            state.postImgSrc = payload;
        },
        actionClearPostImageSrc: (state) => {
            state.postImgSrc = [];
        },
        actionToggleLoadingImg: (state) => {
            state.loading = !state.loading;
        }
    }
});

export const {
    actionSetProfileImageSrc,
    actionClearProfileImageSrc,
    actionSetPostImageSrc,
    actionClearPostImageSrc,
    actionToggleLoadingImg
} = uploadImageSlice.actions;
export default uploadImageSlice.reducer;