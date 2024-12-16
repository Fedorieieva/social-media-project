import React from "react";
import Auth from "../components/organisms/Auth/Auth.jsx";
import style from './style.module.scss';

const AuthPage = () => {
    return (
        <div className={style.authPage}>
            <Auth className={style.form}/>
        </div>
    );
};

export default AuthPage