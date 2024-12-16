import React from "react";
import cn from "classnames";
import styles from "./style.module.scss";
import { tagMap } from "./typography.config";
import PropTypes from "prop-types";

const Typography = (props) => {
    const {
        children,
        className = "",
        style,
        variant = "body",
        title = false,
        tag,
        bold,
        light,
        underline,
        isError = false,
        ...restProps
    } = props;

    const Tag = tag || tagMap[variant];

    const typographyClasses = cn(
        styles[variant],
        {
            [styles.bold]: bold,
            [styles.light]: light,
            [styles.underline]: underline,
            [styles.error]: isError,
            [styles.title]: title
        },
        className
    );

    return (
        <Tag className={typographyClasses} style={style} {...restProps}>
            {children}
        </Tag>
    );
};

Typography.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    variant: PropTypes.oneOf([
        "body",
        "heading",
        "text-5xl",
        "text-4xl",
        "text-3xl",
        "text-2xl",
        "text-xl",
        "text-sm",
        "text-xs",
        "text-xxs",
    ]),
    title: PropTypes.bool,
    tag: PropTypes.string,
    bold: PropTypes.bool,
    light: PropTypes.bool,
    underline: PropTypes.bool,
    isError: PropTypes.bool,
};

export default Typography;
