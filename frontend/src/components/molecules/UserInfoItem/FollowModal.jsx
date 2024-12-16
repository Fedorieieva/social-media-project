import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {ModalBody, ModalClose, ModalHeader, ModalWrapper} from "../../atoms/Modal/index.js";
import style from './style.module.scss';
import PostHeader from "../UserInfoHeader/UserInfoHeader.jsx";
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import {useFollowUser, useUnfollowUser} from "../../../hooks/handleUser.js";
import Button from "../../atoms/Button/Button.jsx";

const FollowModal = ({users, onClose}) => {
    const loggedInUser = useSelector(selectUser);
    const followUser = useFollowUser();
    const unfollowUser = useUnfollowUser();

    const [followers, setFollowers] = useState(loggedInUser.followers);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const isFollowingUser = (userId) => {
        return followers.some((follower) => follower._id === userId);
    };

    const handleFollow = async (userId) => {
        try {
            await followUser(userId);

            setFollowers([...followers, {_id: userId}]);
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            await unfollowUser(userId);

            setFollowers(followers.filter((follower) => follower._id !== userId));
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    const renderFollowButton = (userId) => {
        if (userId === loggedInUser._id) {
            return null;
        }

        return isFollowingUser(userId) ? (
            <Button onClick={() => handleUnfollow(userId)}>Unfollow</Button>
        ) : (
            <Button variant="quaternary" onClick={() => handleFollow(userId)}>Follow</Button>
        );
    };

    return ReactDOM.createPortal(
        <ModalWrapper onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()} className={style.modal}>
                <ModalHeader>
                    <ModalClose onClick={onClose} className={style.modalClose}/>
                </ModalHeader>

                <ModalBody>

                    <div className={style.usersList}>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user._id} className={style.userRow}>
                                    <PostHeader user={user}/>
                                    {renderFollowButton(user._id)}
                                </div>
                            ))
                        ) : (
                            <p>There are no users to show</p>
                        )}
                    </div>

                </ModalBody>
            </div>
        </ModalWrapper>,
        document.body
    );
};

export default FollowModal;
