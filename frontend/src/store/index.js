import React from "react";
import {configureStore} from '@reduxjs/toolkit';
import {authReducer, uploadImageReducer} from "../store/reducers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        uploadImage: uploadImageReducer,
    }
})

export default store;