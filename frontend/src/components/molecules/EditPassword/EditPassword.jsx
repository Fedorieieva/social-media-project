import React from "react";
import {Form, Formik} from "formik";
import style from "./style.module.scss";
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import * as yup from "yup";
import {useEditUserPassword} from "../../../hooks/handleUser.js";

const EditPassword = () => {
    const initialValues = {
        password: '',
        newPassword: '',
    }

    const validationSchema = yup.object().shape({
        password: yup.string().required('Your current password is required'),
        newPassword: yup.string().required('Your new password is required'),
    });

    const handleSubmit = useEditUserPassword();

    return (
        <section>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <div className={style.inputsWrapper}>
                        <InputField name='password' placeholder='Your current password'/>
                        <InputField name='newPassword' placeholder='Your new password'/>
                    </div>

                    <Button
                        type='submit'
                        variant='primary'
                        size='large'
                        className={style.editPasswordBtn}
                    >
                        Save New Password
                    </Button>
                </Form>
            </Formik>
        </section>
    );
};

export default EditPassword