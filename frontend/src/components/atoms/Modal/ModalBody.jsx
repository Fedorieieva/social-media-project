import React from "react";
import cn from 'classnames';
import PropTypes from "prop-types";

const ModalBody = (props) => {
    const {children, className} = props;

    return (
        <div className={cn(className)}>
            {children}
        </div>
    )
}


ModalBody.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
}

export default ModalBody