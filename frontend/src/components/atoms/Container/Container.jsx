import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';
import style from './style.module.scss';


const Container = ({children, className}) => {
    return (
        <div className={cn(style.container, className)}>
            {children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
}

export default Container