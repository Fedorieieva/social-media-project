import React from "react";
import Button from "../../atoms/Button/Button.jsx";
import cn from "classnames";
import style from "./style.module.scss";
import PropTypes from "prop-types";
import AwardCard from "./AwardCard.jsx";

const AwardCardButton = ({award, selectedAward, onClick}) => {
    return (
        <Button
            variant='transparent'
            key={award._id}
            onClick={onClick}
            className={cn(style.awardBtn,
                {[style.activeBtn]: selectedAward && selectedAward._id === award._id})}
        >

            <AwardCard award={award}/>
        </Button>
    )
};

AwardCardButton.propTypes = {
    award: PropTypes.object,
    selectedAward: PropTypes.object,
    onClick: PropTypes.func
}

export default AwardCardButton;