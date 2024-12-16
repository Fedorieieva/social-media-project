import React from "react";
import ImageUpload from "../components/molecules/ImageUpload/ImageUpload.jsx";
import {Form, Formik} from "formik";
import InputField from "../components/atoms/InputField/InputField.jsx";
import Button from "../components/atoms/Button/Button.jsx";
import {useSelector} from "react-redux";
import {selectAuthUserToken, selectUploadedProfileImage} from "../store/selectors/index.js";
import * as yup from "yup";
import axios from "axios";
import {API_URL} from "../config/config.js";
import AllAwards from "../components/molecules/AllAwards/AllAwards.jsx";
import UserAwardPostFeed from "../components/organisms/Feeds/UserAwardPostFeed.jsx";
import Container from "../components/atoms/Container/Container.jsx";
import style from './style.module.scss';
import cn from "classnames";

const Awards = () => {
    // const userUploadedImg = useSelector(selectUploadedProfileImage);
    // const userToken = useSelector(selectAuthUserToken);
    // const initialValues = {
    //     content: ''
    // };
    //
    // const validationSchema = yup.object().shape({
    //     content: yup.string().required('Content is required'),
    // });
    //
    // const handleSubmit = async (values, {resetForm}) => {
    //
    //     console.log(userUploadedImg)
    //     const postData = {
    //         ...values,
    //         imageUrl: userUploadedImg
    //     };
    //
    //     try {
    //         const response = await axios.post(
    //             `${API_URL}/awards`,
    //             postData,
    //             {
    //                 headers: {
    //                     Authorization: `${userToken}`
    //                 }
    //             }
    //         );
    //
    //         console.log('Award created successfully:', response.data);
    //         resetForm();
    //     } catch (error) {
    //         console.error('An error occurred while creating an award:', error.response?.data || error.message);
    //     }
    // };

    return (
        <>
            <section className={cn(style.page, style.awardsPage)}>
                <AllAwards/>
                <UserAwardPostFeed/>
            </section>

            {/*<ImageUpload isProfile={true}/>*/}
            {/*<Formik*/}
            {/*    initialValues={initialValues}*/}
            {/*    onSubmit={handleSubmit}*/}
            {/*    validationSchema={validationSchema}*/}
            {/*>*/}
            {/*    <Form>*/}
            {/*        <InputField name='content' placeholder='Your post text'/>*/}
            {/*        <Button*/}
            {/*            type='submit'*/}
            {/*        >*/}
            {/*            Create Award*/}
            {/*        </Button>*/}
            {/*    </Form>*/}
            {/*</Formik>*/}
        </>
    );
};

export default Awards