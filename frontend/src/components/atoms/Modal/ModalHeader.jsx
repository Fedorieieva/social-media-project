import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';

import './style.module.scss'

const ModalHeader = (props) => {
    const {children, className} = props;

    return(
        <div className={cn(className)}>
            {children}
        </div>
    )
}

ModalHeader.propTypes = {
    children: PropTypes.any
}

export default ModalHeader

