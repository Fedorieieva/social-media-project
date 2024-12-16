import React from "react";
import cn from 'classnames';
import PropTypes from "prop-types";

import './style.module.scss'


const ModalFooter = (props) => {
    const {children, className} = props;

    return (
        <div className={cn(className)}>
            {children}
        </div>
    )
}

ModalFooter.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
}

export default ModalFooter








