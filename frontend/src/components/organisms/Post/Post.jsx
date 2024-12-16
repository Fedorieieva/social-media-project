import React, {useState, useEffect, forwardRef} from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import PostHeader from "../../molecules/UserInfoHeader/UserInfoHeader.jsx";
import PostSwiper from "../../molecules/PostSwiper/PostSwiper.jsx";
import Button from "../../atoms/Button/Button.jsx";
import PostComment from "../../molecules/PostComment/PostComment.jsx";
import Edit from "../../../../public/images/icons/edit.svg?react";
import Delete from "../../../../public/images/icons/delete.svg?react";
import {useSelector} from "react-redux";
import {selectUser} from "../../../store/selectors/index.js";
import EditTextArea from "../../molecules/EditTextArea/EditTextArea.jsx";
import {useFetchUser} from "../../../hooks/handleUser.js";
import {useFetchAwardById} from "../../../hooks/fetchAwards.js";
import {useFetchComments} from "../../../hooks/handleComment.js";
import {useDeletePost, useEditPost, useHandleLikes, useHandleSaved} from "../../../hooks/handlePost.js";
import style from "./style.module.scss";
import PostNav from "../../molecules/PostNav/PostNav.jsx";
import AwardHeaderInfo from "../../molecules/AwardHeaderInfo/AwardHeaderInfo.jsx";

const Post = forwardRef(({post}, ref) => {
    const loggedInUser = useSelector(selectUser)._id || useSelector(selectUser).id;
    const user = useFetchUser(post.user);
    const award = useFetchAwardById(post.awardId);
    const {comments, fetchComments} = useFetchComments(post._id);

    const [content, setContent] = useState(post.content);
    const [seeComments, setSeeComments] = useState(false);
    const {isEditing, editPost} = useEditPost();
    const [isEditingContent, setIsEditingContent] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(post.likes.includes(loggedInUser));
    const [isSaved, setIsSaved] = useState(post.saved.includes(loggedInUser));
    const hasImgs = post.imageUrls && post.imageUrls.length > 0;

    const deletePost = useDeletePost();
    const updateLikes = useHandleLikes();
    const updateSaved = useHandleSaved();

    const handleLike = async () => {
        const updatedLikes = await updateLikes(post._id, likes);
        setLikes(updatedLikes);
        setIsLiked(!isLiked);
    };

    const handleSave = async () => {
        const updatedSaved = await updateSaved(post._id, likes);
        setIsSaved(!isSaved);
    };

    const toggleComments = () => {
        setSeeComments(!seeComments);
    };

    useEffect(() => {
        if (seeComments) {
            fetchComments();
        }
    }, [seeComments, fetchComments]);

    return (
        <>
            <div
                ref={ref}
                className={cn(style.post, {
                    [style.withImages]: hasImgs,
                    [style.withoutImages]: !hasImgs,
                })}
            >
                {user && (
                    <div className={style.header}>
                        <PostHeader
                            user={user}
                            className={style.headerUser}
                            award={award ?? null}
                        />

                        <div className={style.headerInfo}>
                            {award ? (
                                <AwardHeaderInfo award={award}/>
                            ) : null}

                            {post.user === loggedInUser && (
                                <div className={style.headerActionsWrapper}>
                                    <Button
                                        className={style.actionBtn}
                                        onClick={() => setIsEditingContent(!isEditingContent)}
                                        variant="transparent"
                                    >
                                        <Edit/>
                                    </Button>

                                    <Button
                                        className={style.actionBtn}
                                        variant="transparent"
                                        onClick={() => deletePost(post)}
                                    >
                                        <Delete/>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {post.imageUrls?.length > 0 && (
                    <PostSwiper imageUrls={post.imageUrls} className={style.swiper}/>
                )}

                <EditTextArea
                    content={content}
                    setContent={setContent}
                    onClick={async () => {
                        await editPost(post._id, content);
                        setIsEditingContent(false);
                    }}
                    isEditing={isEditingContent}
                />

                <PostNav
                    likes={likes}
                    postId={post._id}
                    isLiked={isLiked}
                    isSaved={isSaved}
                    onLike={handleLike}
                    onSave={handleSave}
                />

                <section className={style.commentsSection}>
                    <Button
                        fullWidth={true}
                        onClick={toggleComments}
                    >
                        {seeComments ? "Hide comments" : "Show comments"}
                    </Button>

                    {seeComments && comments && (
                        <div className={style.comments}>
                            {comments.map((comment) => (
                                <PostComment
                                    key={comment._id}
                                    comment={comment}
                                    postId={post._id}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
});

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
