import React, { useState } from "react";
import UserProfile from "../components/organisms/UserProfile/UserProfile.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../store/selectors/index.js";
import UserProfileFeed from "../components/organisms/Feeds/UserProfileFeed.jsx";
import Button from "../components/atoms/Button/Button.jsx";
import { useParams } from "react-router-dom";
import UserProgress from "../components/organisms/UserProgress/UserProgress.jsx";
import AllAwards from "../components/molecules/AllAwards/AllAwards.jsx";
import style from "./style.module.scss";
import cn from "classnames";
import { useFollowUser, useUnfollowUser } from "../hooks/handleUser.js";

const UserAccount = () => {
    const [content, setContent] = useState("profileFeed");
    const { userId } = useParams();
    const loggedInUser = useSelector(selectUser);
    const loggedInUserId = loggedInUser?._id;
    const isCurrentUser = userId === undefined || loggedInUserId === userId;
    const [isFollowing, setIsFollowing] = useState(
        loggedInUser.followers.some(follower => follower._id === userId)
    );
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const followUser = useFollowUser();
    const unfollowUser = useUnfollowUser();

    const handleFollowAction = async () => {
        if (isFollowing) {
            await unfollowUser(userId);
            setIsFollowing(false);
        } else {
            await followUser(userId);
            setIsFollowing(true);
        }

        setRefetchTrigger(prev => prev + 1);
    };

    const renderActions = () =>
        isCurrentUser ? (
            <>
                <Button to="/profile/edit" variant="quaternary">
                    Edit Profile
                </Button>
                <Button variant="quaternary" to="/saved">
                    Saved Posts
                </Button>
            </>
        ) : (
            <Button onClick={handleFollowAction}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
        );

    return (
        <div className={cn(style.page, style.userAccountPage)}>
            <UserProfile renderActions={renderActions()} refetchTrigger={refetchTrigger} />

            {isCurrentUser ? (
                <>
                    <div className={style.userAccountActions}>
                        <Button
                            onClick={() => setContent("profileFeed")}
                            variant="transparent"
                            className={content === "profileFeed" ? style.activeActionBtn : ""}
                        >
                            Posts
                        </Button>

                        <Button
                            onClick={() => setContent("progress")}
                            variant="transparent"
                            className={content === "progress" ? style.activeActionBtn : ""}
                        >
                            Progress
                        </Button>
                    </div>

                    {content === "profileFeed" && <UserProfileFeed />}

                    {content === "progress" && (
                        <>
                            <AllAwards />
                            <UserProgress />
                        </>
                    )}
                </>
            ) : (
                <UserProfileFeed />
            )}
        </div>
    );
};

export default UserAccount;
