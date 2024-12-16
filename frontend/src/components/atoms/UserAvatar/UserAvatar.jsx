import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import style from "./style.module.scss";
import User from '../../../../public/images/icons/user.svg?react';

const UserAvatar = ({ src, size = "large" }) => {
    const avatarClasses = cn(style.userAvatarWrapper, {
        [style.small]: size === "small",
        [style.medium]: size === "medium",
        [style.dynamicSize]: size === "large",
    });

    return (
        <div className={avatarClasses}>
            {src ? (
                <img src={src} alt="User avatar" className={style.avatarImage} />
            ) : (
                <User/>
            )}
        </div>
    );
};

UserAvatar.propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default UserAvatar;
