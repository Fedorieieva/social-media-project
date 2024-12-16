import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
import {Field, ErrorMessage, useFormikContext} from "formik";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import EmojiPicker from "emoji-picker-react";
import style from "./style.module.scss";
import cn from "classnames";
import Button from "../Button/Button.jsx";
import Emoji from "../../../../public/images/icons/emoji.svg?react";
import useClickOutside from "../../../hooks/useClickOutside.js";

const InputField = (props) => {
    const {name, type = "text", placeholder = "", className, emojiPicker = false} = props;
    const {setFieldValue, values} = useFormikContext();
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    const handleEmojiClick = (emojiObject) => {
        const currentValue = values[name] || "";
        const newValue = currentValue + emojiObject.emoji;
        setFieldValue(name, newValue);
    };

    useClickOutside(pickerRef, () => setShowPicker(false));

    return (
        <div className={cn(style.inputFieldContainer, className)}>
            <div className={style.inputWrapper}>
                <Field
                    name={name}
                    type={name === "password" ? "password" : type}
                    placeholder={placeholder}
                    className={style.fieldInput}
                />

                {emojiPicker && (
                    <div>
                        <Button
                            className={style.emojiBtn}
                            onClick={() => setShowPicker(!showPicker)}
                            variant="transparent"
                        >
                            <Emoji/>
                        </Button>

                        {showPicker && (
                            <div ref={pickerRef} className={style.emojiPicker}>
                                <EmojiPicker
                                    onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ErrorMessage
                name={name}
                component={({children}) => (
                    <Typography isError underline variant="text-xs">
                        {children}
                    </Typography>
                )}
            />
        </div>
    );
};

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    emojiPicker: PropTypes.bool,
};

export default InputField;
