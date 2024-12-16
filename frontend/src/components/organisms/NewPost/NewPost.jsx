import React, {useState} from "react";
import {Form, Formik} from "formik";
import * as yup from 'yup';
import Button from "../../atoms/Button/Button.jsx";
import ImageUpload from "../../molecules/ImageUpload/ImageUpload.jsx";
import InputField from "../../atoms/InputField/InputField.jsx";
import Typography from "../../../shared/ui/Typography/Tupography.jsx";
import style from "./style.module.scss";
import {useNewPost} from "../../../hooks/handlePost.js";
import {useFetchAllAwards} from "../../../hooks/fetchAwards.js";
import AwardCardButton from "../../molecules/AwardCard/AwardCardButton.jsx";
import {useSelector} from "react-redux";
import {selectIsLoadingImages} from "../../../store/selectors/uploadImage.selectors.js";

const NewPost = () => {
    const isLoadingImages = useSelector(selectIsLoadingImages);
    const awards = useFetchAllAwards();
    const [selectedAward, setSelectedAward] = useState(null);
    const initialValues = {
        content: ''
    };

    const validationSchema = yup.object().shape({
        content: yup.string().required('Comment is required'),
    });

    const handleSubmit = useNewPost(selectedAward);

    return (
        <div className={style.newPost}>
            <div className={style.awards}>
                <Typography>Select award to create a post within it (optional)</Typography>

                <div className={style.awardsWrapper}>
                    {awards.map((award) => (
                        <AwardCardButton
                            award={award}
                            selectedAward={selectedAward}
                            onClick={() => setSelectedAward(award)}
                            key={award._id}
                        />
                    ))}
                </div>
            </div>

            <ImageUpload/>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className={style.form}>
                    <InputField
                        name='content'
                        placeholder='Your post text'
                        emojiPicker={true}
                    />

                    <Button
                        type='submit'
                        disabled={isLoadingImages}
                    >
                        Create Post
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default NewPost
