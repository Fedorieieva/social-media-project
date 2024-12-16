import React, {useState} from "react";
import style from './style.module.scss';
import PropTypes from "prop-types";
import PostHeader from "../UserInfoHeader/UserInfoHeader.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Edit from '../../../../public/images/icons/edit.svg?react';
import Delete from '../../../../public/images/icons/delete.svg?react';
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import EditTextArea from "../EditTextArea/EditTextArea.jsx";
import {useDeleteComment, useEditComment} from "../../../hooks/handleComment.js";

const PostComment = ({comment}) => {
    const loggedInUser = useSelector(selectUser)._id;
    const [content, setContent] = useState(comment.content);
    const [isEditingContent, setIsEditingContent] = useState(false);
    const {isEditing, handleSaveEdit} = useEditComment();
    const deleteComment = useDeleteComment();

    const handleSave = () => {
        handleSaveEdit(comment._id, content);
        setIsEditingContent(false);
    };

    return (
        <div>
            <div className={style.headerWrapper}>
                <PostHeader user={comment.user}/>

                {comment.user._id === loggedInUser && (
                    <div className={style.headerActions}>
                        <Button
                            className={style.actionBtn}
                            variant="transparent"
                            onClick={() => setIsEditingContent(!isEditingContent)}
                        >
                            <Edit/>
                        </Button>
                        <Button
                            className={style.actionBtn}
                            variant="transparent"
                            onClick={() => deleteComment(comment._id)}
                        >
                            <Delete/>
                        </Button>
                    </div>
                )}
            </div>

            <EditTextArea
                content={content}
                setContent={setContent}
                onClick={handleSave}
                isEditing={isEditingContent}
                disabled={isEditing}
                className={style.comment}
            />
        </div>
    );
};

PostComment.propTypes = {
    comment: PropTypes.object
}

export default PostComment