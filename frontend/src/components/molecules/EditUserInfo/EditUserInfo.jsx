import React, {useMemo} from "react";
import style from './style.module.scss';
import {useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import InputField from "../../atoms/InputField/InputField.jsx";
import Button from "../../atoms/Button/Button.jsx";
import {useEditUserInfo} from "../../../hooks/handleUser.js";
import {selectUser} from "../../../store/selectors/index.js";

const EditUserInfo = () => {
    const userInfo = useSelector(selectUser);

    const initialValues = useMemo(() => ({
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        email: userInfo.email || "",
        birthdate: userInfo.birthdate || "",
        gender: userInfo.gender || "",
        avatarUrl: userInfo.avatarUrl || "",
    }), [userInfo]);

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        birthdate: yup
            .string()
            .nullable()
            .transform((value, originalValue) => {
                return originalValue ? new Date(originalValue).toISOString() : null;
            }),
        gender: yup.string().oneOf(["male", "female", "other"]).nullable(),
    });

    const handleSubmit = useEditUserInfo();

    return (
        <section className={style.edit}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <div className={style.inputsWrapper}>
                        <InputField name="firstName" placeholder="First Name" />
                        <InputField name="lastName" placeholder="Last Name" />
                        <InputField name="email" placeholder="E-mail" />
                        <InputField name="birthdate" placeholder="Birth Date" />

                        <div className={style.selectGender}>
                            <Field as="select" name="gender">
                                <option value="">Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </Field>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                    >
                        Edit Profile
                    </Button>
                </Form>
            </Formik>

            <Button
                to="password"
                variant="transparent"
                size="large"
                className={style.passwordBtn}
            >
                Edit Password
            </Button>
        </section>
    );
};

export default EditUserInfo;
