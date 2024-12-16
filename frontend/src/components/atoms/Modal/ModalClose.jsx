import React from 'react';
import PropTypes from "prop-types";
import cn from 'classnames'

import Button from "../Button/Button.jsx";


const ModalClose = (props) => {
    const {onClick, className} = props;

    return (
        <Button className={cn(className)} onClick={onClick} variant='transparent'>
            X
        </Button>
    )
}

ModalClose.propTypes = {
    onClick: PropTypes.func
}

export default ModalClose


