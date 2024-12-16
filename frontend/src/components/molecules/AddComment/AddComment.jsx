import React from "react";
import * as yup from "yup";
import {Form, Formik} from "formik";
import PropTypes from "prop-types";
import style from "./style.module.scss";
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Send from '../../../../public/images/icons/send.svg?react';
import {useAddComment} from "../../../hooks/handleComment.js";

const AddComment = ({postId}) => {
    const initialValues = {content: ''};
    const validationSchema = yup.object().shape({
        content: yup.string().required('Comment is required')
    });
    const handleSubmit = useAddComment(postId);

    const handleFormSubmit = async (values, actions) => {
        await handleSubmit(values, actions);
    };

    return (
        <div className={style.addComment}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <InputField
                        className={style.input}
                        name="content"
                        placeholder="Your comment..."
                        emojiPicker={true}
                    />
                    <Button type="submit" variant="transparent" className={style.btn}>
                        <Send/>
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

AddComment.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default AddComment