import React from "react";
import EditUserInfo from "../components/molecules/EditUserInfo/EditUserInfo.jsx";
import ImageUpload from "../components/molecules/ImageUpload/ImageUpload.jsx";
import style from './style.module.scss';
import BackNavigation from '../components/atoms/BackNavigation/BackNavigation.jsx';
import Typography from "../shared/ui/Typography/Tupography.jsx";
import cn from "classnames";

const EditAccount = () => {
    return (
        <div className={cn(style.page, style.editPage)}>
            <div className={style.editPageTitle}>
                <BackNavigation/>
                <Typography variant='text-2xl' title={true}>Edit account</Typography>
            </div>

            <ImageUpload isProfile={true}/>
            <EditUserInfo/>
        </div>
    );
};

export default EditAccount