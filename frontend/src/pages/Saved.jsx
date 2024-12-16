import React from "react";
import Container from "../components/atoms/Container/Container.jsx";
import SavedFeed from "../components/organisms/Feeds/SavedFeed.jsx";
import BackNavigation from "../components/atoms/BackNavigation/BackNavigation.jsx";
import cn from "classnames";
import style from "./style.module.scss";
import Typography from "../shared/ui/Typography/Tupography.jsx";

const Saved = () => {
    return (
        <div className={cn(style.page, style.savedPage)}>
            <div className={style.savedPageTitle}>
                <BackNavigation/>
                <Typography variant='text-2xl' title={true}>Saved posts</Typography>
            </div>

            <SavedFeed/>
        </div>
    );
};

export default Saved