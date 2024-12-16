import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar.jsx";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";

const AwardHeaderInfo = ({award}) => {
    return (
        <>
            {award.imageUrl ? (
                <UserAvatar src={award.imageUrl} size="small"/>
            ) : (
                <Typography>{award.title}</Typography>
            )}
        </>
    );
};

AwardHeaderInfo.propTypes = {
    award: PropTypes.object
}

export default AwardHeaderInfo