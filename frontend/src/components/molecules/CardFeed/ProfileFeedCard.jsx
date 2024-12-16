import React, {useState, forwardRef} from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button/Button.jsx";
import style from './style.module.scss';
import PostModal from "../../organisms/PostModal/PostModal.jsx";

const ProfileFeedCard = forwardRef(({post}, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasImages = post?.imageUrls && post.imageUrls.length > 0;

    return (
        <div ref={ref}>
            <Button
                variant="transparent"
                className={style.postBtn}
                onClick={() => setIsModalOpen(true)}
            >
                {hasImages ? (
                    <div
                        className={style.userPost}
                        style={{
                            backgroundImage: `url(${post.imageUrls[0]})`,
                        }}
                    />
                ) : (
                    <p>{post?.content}</p>
                )}
            </Button>

            {isModalOpen && (
                <PostModal
                    post={post}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
});

ProfileFeedCard.propTypes = {
    post: PropTypes.object,
};

export default ProfileFeedCard;
