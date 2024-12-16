import React from "react";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import style from './style.module.scss';
import PropTypes from "prop-types";

const AccountInfoItem = ({title, info}) => {
    return (
        <div className={style.accountInfoItem}>
            <Typography variant='text-xl' bold className={style.info}>{info}</Typography>
            <Typography variant='text-xs' className={style.title}>{title}</Typography>
        </div>
    )
};

AccountInfoItem.propTypes = {
    title: PropTypes.string,
    info: PropTypes.number,
}

export default AccountInfoItem