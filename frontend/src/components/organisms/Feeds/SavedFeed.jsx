import React from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import CardFeed from "../../molecules/CardFeed/CardFeed.jsx";

const SavedFeed = () => {
    const loggedInUser = useSelector(selectUser)._id || useSelector(selectUser).id;
    const fetchUrl = `posts/user/${loggedInUser}/saved`;

    return <CardFeed fetchUrl={fetchUrl} queryKey='savedPosts'/>;
};

export default SavedFeed;
