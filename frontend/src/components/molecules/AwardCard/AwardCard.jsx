import React from "react";
import style from './style.module.scss';
import cn from "classnames";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar.jsx";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import Button from "../../atoms/Button/Button.jsx";
import PropTypes from "prop-types";

const AwardCard = ({award}) => {
    return (
        <>
            {award?.imageUrl && (
                <UserAvatar src={award?.imageUrl} size='medium'/>
            )}

            <Typography>{award?.title}</Typography>
        </>
    );
};

AwardCard.propTypes = {
    award: PropTypes.object,
}

export default AwardCard