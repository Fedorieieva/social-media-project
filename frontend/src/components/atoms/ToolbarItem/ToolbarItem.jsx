import React from "react";
import PropTypes from "prop-types";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';
import Button from "../Button/Button.jsx";

const ToolbarItem = ({children, text, link, className, onClick}) => {
    return (
        <div className={className}>
            <Button
                to={!onClick ? link : undefined}
                onClick={onClick}
                variant="tertiary"
                className={style.toolbarItem}
            >
                {children}
                <Typography className={style.text} variant="text-sm">
                    {text}
                </Typography>
            </Button>
        </div>
    );
};

ToolbarItem.propTypes = {
    children: PropTypes.any,
    text: PropTypes.string,
    link: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default ToolbarItem;
