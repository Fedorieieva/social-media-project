import React from "react";
import axios from "axios";
import {API_URL} from "../config/config.js";
import {useDispatch} from "react-redux";
import {actionSetPostImageSrc, actionSetProfileImageSrc, actionToggleLoadingImg} from "../store/reducers/uploadedImage.slice.js";

const postUrl = `https://api.cloudinary.com/v1_1/dotz9ajec/image/upload`;

export const useImageUpload = () => {
    const dispatch = useDispatch();

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "wqox7fvv");

        const response = await fetch(postUrl, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const data = await response.json();
        return data.secure_url;
    };

    const handleImageUpload = async (files, isProfile = false) => {
        dispatch(actionToggleLoadingImg());

        if (files.length > 10) {
            alert("You can upload a maximum of 10 images.");
            files = files.slice(0, 10);
        }

        try {
            let imageUrls = [];

            if (isProfile && files.length > 0) {
                const imageUrl = await uploadImage(files[0]);
                dispatch(actionSetProfileImageSrc(imageUrl));
                console.log("Uploaded profile image URL:", imageUrl);
                imageUrls = [imageUrl];
            } else {
                for (const file of files) {
                    const imageUrl = await uploadImage(file);
                    imageUrls.push(imageUrl);
                }

                dispatch(actionSetPostImageSrc(imageUrls));
                console.log("Uploaded post image URLs in order:", imageUrls);
            }

            return imageUrls;
        } catch (error) {
            console.error("Error uploading images:", error);
            throw error;
        } finally {
            dispatch(actionToggleLoadingImg());
        }
    };

    return {handleImageUpload};
};

export const useDeleteImgFromCloudinary = async (url, userToken) => {
    const getPublicIdFromUrl = (url) => {
        const parts = url.split('/upload/')[1];
        if (!parts) return null;

        const pathWithoutExtension = parts.split('.')[0];
        const segments = pathWithoutExtension.split('/');
        return segments[segments.length - 1];
    };

    const deleteImgFromCloudinary = async (imgId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/cloudinary`,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    data: {publicId: imgId},
                    withCredentials: true,
                }
            );
            console.log("Image deleted successfully:", response.data);
        } catch (error) {
            console.error(
                "An error occurred while deleting image:",
                error.response?.data || error.message
            );
        }
    };

    await deleteImgFromCloudinary(getPublicIdFromUrl(url));
};
