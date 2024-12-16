import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import CardFeed from "../../molecules/CardFeed/CardFeed.jsx";

const UserProfileFeed = () => {
    const {pathname} = useLocation();

    const loggedInUser = useSelector(selectUser);
    const loggedInUserId = loggedInUser?._id || loggedInUser?.id;
    const extractedUserId = pathname.split('/').pop();
    const userId = extractedUserId === 'profile' ? loggedInUserId : extractedUserId;
    const url = `posts/user/${userId}`;

    return (
        <div>
            <CardFeed
                fetchUrl={url}
                queryKey="userProfilePosts"
                userId={userId}
            />
        </div>
    );
};

export default UserProfileFeed;
