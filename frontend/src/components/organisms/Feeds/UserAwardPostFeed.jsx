import React from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import PostFeed from "../../molecules/PostFeed/PostFeed.jsx";
import style from './style.module.scss';

const UserAwardPostFeed = () => {
    const userId = useSelector(selectUser)._id || useSelector(selectUser).id;
    const fetchUrl = `posts/user/${userId}/award`;

    return <PostFeed fetchUrl={fetchUrl} queryKey='userAwardPosts'  className={style.awardFeed}/>;
};

export default UserAwardPostFeed