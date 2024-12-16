import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import cn from 'classnames';
import style from './style.module.scss';

const Button = (props) => {
    const {
        children,
        className = '',
        type = 'button',
        onClick,
        shadow = false,
        fullWidth = false,
        size = 'small',
        variant = 'primary',
        to,
        ...restProps
    } = props;
    const Component = to ? Link : 'button';

    const buttonClasses = cn(
        style.button,
        style[size],
        style[variant],
        {[style.shadow]: shadow},
        {[style.fullWidth]: fullWidth},
        className
    );

    return (
        <Component
            to={to}
            type={!to ? type : undefined}
            onClick={!to ? onClick : undefined}
            className={buttonClasses}
            {...restProps}
        >
            {children}
        </Component>
    );
};

Button.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'large']),
    shadow: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'transparent']),
    to: PropTypes.string
}

export default Button

