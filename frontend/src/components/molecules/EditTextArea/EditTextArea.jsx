import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import style from "./style.module.scss";
import Button from "../../atoms/Button/Button.jsx";
import Send from "../../../../public/images/icons/send.svg?react";
import cn from "classnames";
import Emoji from "../../../../public/images/icons/emoji.svg?react";
import EmojiPicker from "emoji-picker-react";
import useClickOutside from "../../../hooks/useClickOutside.js";

const EditTextArea = (props) => {
    const {content, setContent, onClick, isEditing, className} = props;
    const textAreaRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    const handleEmojiClick = (emojiObject) => {
        setContent((prevContent) => `${prevContent}${emojiObject.emoji}`);
    };

    useClickOutside(pickerRef, () => setShowPicker(false));

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onClick();
        }
    };

    useEffect(() => {
        const adjustHeight = () => {
            const textarea = textAreaRef.current;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        };

        adjustHeight();
    }, [content]);

    return (
        <div className={cn(style.commentWrapper, className)}>
            <textarea
                className={style.comment}
                value={content}
                ref={textAreaRef}
                disabled={!isEditing}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={isEditing ? handleKeyDown : undefined}
            />

            {isEditing && (
                <div className={style.controls}>
                    <Button
                        className={style.emojiBtn}
                        onClick={() => setShowPicker((prev) => !prev)}
                        variant="transparent"
                    >
                        <Emoji/>
                    </Button>

                    {showPicker && (
                        <div ref={pickerRef} className={style.emojiPicker}>
                            <EmojiPicker onEmojiClick={handleEmojiClick}/>
                        </div>
                    )}

                    <Button
                        variant="transparent"
                        className={style.editCommentBtn}
                        onClick={onClick}
                    >
                        <Send/>
                    </Button>
                </div>
            )}
        </div>
    );
};

EditTextArea.propTypes = {
    content: PropTypes.string.isRequired,
    setContent: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

export default EditTextArea;
