import React from 'react';
import PropTypes from "prop-types";
import {useImageUpload} from "../../../hooks/handleCloudinary.js";
import Button from "../../atoms/Button/Button.jsx";
import {useSelector} from "react-redux";
import {selectIsLoadingImages} from "../../../store/selectors/uploadImage.selectors.js";

const ImageUpload = ({isProfile = false}) => {
    const {handleImageUpload} = useImageUpload();
    const isLoadingImages = useSelector(selectIsLoadingImages);

    const onChange = async (e) => {
        const files = Array.from(e.target.files);
        try {
            await handleImageUpload(files, isProfile);
        } catch (error) {
            console.error("Image upload failed", error);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={onChange}
                multiple={!isProfile}
                id="file-upload"
                accept="image/*"
                style={{display: 'none'}}
            />
            <Button>
                <label htmlFor="file-upload">Choose Image</label>
            </Button>

            {isLoadingImages && <p>Uploading...</p>}
        </div>
    );
};

ImageUpload.propTypes = {
    isProfile: PropTypes.bool
}

export default ImageUpload;
