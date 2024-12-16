import React, {useEffect, useState} from "react";
import PostFeed from "../../molecules/PostFeed/PostFeed.jsx";
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import PropTypes from "prop-types";
import cn from 'classnames';
import style from './style.module.scss';

const HomeFeed = ({className}) => {
    const user = useSelector(selectUser);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (user && (user._id || user.id)) {
            const loggedInUserId = user._id || user.id;
            setUrl(`posts/${loggedInUserId}`);
        }
    }, [user]);

    if (!url) {
        return <div>Loading...</div>;
    }

    return <PostFeed fetchUrl={url} queryKey="userPosts" className={cn(className, style.homeFeed)}/>;
};

HomeFeed.propTypes = {
    className: PropTypes.string
}

export default HomeFeed