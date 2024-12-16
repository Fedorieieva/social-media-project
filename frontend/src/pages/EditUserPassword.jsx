import React from "react";
import Container from "../components/atoms/Container/Container.jsx";
import EditPassword from "../components/molecules/EditPassword/EditPassword.jsx";
import BackNavigation from "../components/atoms/BackNavigation/BackNavigation.jsx";
import cn from "classnames";
import style from "./style.module.scss";
import Typography from "../shared/ui/Typography/Tupography.jsx";

const EditUserPassword = () => {
    return (
        <div className={cn(style.page, style.editUserPassword)}>
            <div className={style.editUserPasswordTitle}>
                <BackNavigation/>
                <Typography variant='text-2xl' title={true}>
                    Edit your password
                </Typography>
            </div>

            <EditPassword/>
        </div>
    );
};

export default EditUserPassword