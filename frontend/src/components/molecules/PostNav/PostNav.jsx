import React, {useState} from "react";
import cn from 'classnames';
import PropTypes from "prop-types";
import style from './style.module.scss';
import Like from '../../../../public/images/icons/heart.svg?react';
import Save from '../../../../public/images/icons/save.svg?react';
import Comment from '../../../../public/images/icons/message.svg?react';
import Button from "../../atoms/Button/Button.jsx";
import AddComment from "../AddComment/AddComment.jsx";

const PostNav = ({likes, postId, isLiked, isSaved, onLike, onSave}) => {
    const [isAddComment, setIsAddComment] = useState(false);

    return (
        <div>
            <nav className={style.nav}>
                <Button
                    size="small"
                    className={cn(style.like, {[style.isLiked]: isLiked})}
                    variant="transparent"
                    onClick={onLike}
                >
                    <Like /> {likes}
                </Button>
                <Button
                    size="small"
                    onClick={() => setIsAddComment(!isAddComment)}
                    variant="transparent"
                >
                    <Comment />
                </Button>
                <Button
                    size="small"
                    className={cn(style.save, {[style.isSaved]: isSaved})}
                    variant="transparent"
                    onClick={onSave}
                >
                    <Save />
                </Button>
            </nav>

            {isAddComment && <AddComment postId={postId} />}
        </div>
    );
};

PostNav.propTypes = {
    likes: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    isSaved: PropTypes.bool.isRequired,
    onLike: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};


export default PostNav