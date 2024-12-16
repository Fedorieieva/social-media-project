import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';
import style from './style.module.scss';
import ToolbarItem from "../../atoms/ToolbarItem/ToolbarItem.jsx";
import Home from '../../../../public/images/icons/home.svg?react';
import User from '../../../../public/images/icons/user.svg?react';
import NewPost from '../../../../public/images/icons/plus.svg?react';
import Awards from '../../../../public/images/icons/goblet.svg?react';
import Search from '../../../../public/images/icons/search.svg?react';
import LogOut from '../../../../public/images/icons/log-out.svg?react';
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import {actionClearUserData} from "../../../store/reducers/auth.reducer.js";


const Toolbar = ({className}) => {
    const userId = useSelector(selectUser)._id;
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(actionClearUserData())
    }

    return (
        <nav className={cn(style.nav, className)}>
            <ToolbarItem text='Home' link='/home'>
                <Home/>
            </ToolbarItem>
            <ToolbarItem text='Search' link='/search' className={style.search}>
                <Search/>
            </ToolbarItem>
            <ToolbarItem text='New Post' link='/new-post'>
                <NewPost/>
            </ToolbarItem>
            <ToolbarItem text='Awards' link="/awards">
                <Awards/>
            </ToolbarItem>
            <ToolbarItem text='My Account' link={`/${userId}`}>
                <User/>
            </ToolbarItem>
            <ToolbarItem text='Log Out' onClick={handleLogOut} className={style.logOut}>
                <LogOut/>
            </ToolbarItem>
        </nav>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string
}

export default Toolbar
