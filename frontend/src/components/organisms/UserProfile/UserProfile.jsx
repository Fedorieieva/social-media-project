import React from "react";
import style from './style.module.scss';
import UserInfoItem from "../../molecules/UserInfoItem/UserInfoItem.jsx";

const UserProfile = ({renderActions, refetchTrigger}) => {
    return (
        <section className={style.userProfileSection}>
            <UserInfoItem refetchTrigger={refetchTrigger} />

            <div className={style.userActions}>
                {renderActions}
            </div>
        </section>
    );
};

export default UserProfile