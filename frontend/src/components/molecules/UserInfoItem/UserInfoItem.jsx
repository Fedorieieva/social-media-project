import React, {useState} from "react";
import {useFetchUser} from "../../../hooks/handleUser.js";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar.jsx";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import AccountInfoItem from "../../atoms/AccountInfoItem/AccountInfoItem.jsx";
import {useParams} from "react-router-dom";
import style from './style.module.scss';
import {useFetchUserPostsNumber} from "../../../hooks/fetchPosts.js";
import Button from "../../atoms/Button/Button.jsx";
import FollowModal from "./FollowModal.jsx";

const UserInfoItem = ({refetchTrigger}) => {
    const [modal, setModal] = useState('');
    const {userId} = useParams();
    const fetchedUser = useFetchUser(userId, refetchTrigger);

    const totalPostsNum = useFetchUserPostsNumber(`posts/user/${userId}`) || 0;
    const totalFollowersNum = fetchedUser?.followedBy?.length || 0;
    const totalFollowingsNum = fetchedUser?.followers?.length || 0;

    return (
        <div className={style.userInfoItem}>
            <UserAvatar src={fetchedUser?.avatarUrl}/>

            <div className={style.userInfo}>
                <Typography variant="text-xl">
                    {fetchedUser?.firstName}
                </Typography>
                <Typography variant="text-sm" className={style.userInfoLogin}>
                    {fetchedUser?.email}
                </Typography>
            </div>

            <div className={style.accountInfoWrapper}>
                <AccountInfoItem info={totalPostsNum} title="posts"/>
                <Button variant='transparent' onClick={() => setModal('follow')}>
                    <AccountInfoItem info={totalFollowersNum} title="followers"/>
                </Button>
                <Button variant='transparent' onClick={() => setModal('following')}>
                    <AccountInfoItem info={totalFollowingsNum} title="following"/>
                </Button>
            </div>

            {modal === 'follow' && <FollowModal users={fetchedUser.followedBy } onClose={() => setModal('')}/>}
            {modal === 'following' && <FollowModal users={fetchedUser.followers} onClose={() => setModal('')}/>}
        </div>
    );
};

export default UserInfoItem;
