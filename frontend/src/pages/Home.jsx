import React from "react";
import Search from "../components/molecules/Search/Search.jsx";
import HomeFeed from "../components/organisms/Feeds/HomeFeed.jsx";
import style from './style.module.scss';
import cn from 'classnames';

const Home = () => {
    return (
        <div className={cn(style.page, style.homePage)}>
            <HomeFeed className={style.homeFeed}/>
            <Search className={style.search}/>
        </div>
    );
};

export default Home;