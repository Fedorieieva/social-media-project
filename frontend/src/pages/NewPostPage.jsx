import React from "react";
import NewPost from "../components/organisms/NewPost/NewPost.jsx";
import cn from "classnames";
import style from "./style.module.scss";
import Typography from "../shared/ui/Typography/Tupography.jsx";

const NewPostPage = () => {
    return (
        <div className={cn(style.page, style.newPost)}>
            <Typography
                variant='text-2xl'
                title={true}
            >
                Create your new post
            </Typography>
            <NewPost/>
        </div>
    )
}

export default NewPostPage