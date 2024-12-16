import React from "react";
import Button from "../Button/Button.jsx";
import Arrow from '../../../../public/images/icons/arrow.svg?react'
import {useNavigate} from "react-router-dom";

const BackNavigation = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return <Button variant='transparent' onClick={handleGoBack}>
        <Arrow/>
    </Button>
}

export default BackNavigation