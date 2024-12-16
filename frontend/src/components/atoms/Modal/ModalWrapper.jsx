import React from "react";
import PropTypes from "prop-types";

import style from './style.module.scss'

const ModalWrapper = (props) => {
    const {children, onClick} = props;

    return (
        <div className={style.modalWrapper} onClick={onClick}>
            {children}
        </div>
    );
};


ModalWrapper.proptypes = {
    children: PropTypes.any,
    onClick: PropTypes.func
}

export default ModalWrapper