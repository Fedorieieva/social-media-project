import {useState} from "react";
import axios from "axios";
import {API_URL} from "../config/config.js";
import {useSelector} from "react-redux";
import {selectAuthUserToken, selectUploadedPostImages, selectUser} from "../store/selectors/index.js";
import {useDeleteImgFromCloudinary} from "./handleCloudinary.js";
import {useNavigate} from "react-router-dom";

export const useDeletePost = () => {
    const userToken = useSelector(selectAuthUserToken);
    const navigate = useNavigate();

    return async (post) => {
        try {
            if (post?.imageUrls?.length > 0) {
                for (const url of post.imageUrls) {
                    await useDeleteImgFromCloudinary(url, userToken);
                }
            }

            const response = await axios.delete(
                `${API_URL}/posts/${post._id}`,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );

            navigate('/home');
            console.log("Post deleted successfully:", response.data);
        } catch (error) {
            console.error(
                "An error occurred while deleting post:",
                error.response?.data || error.message
            );
        }
    };
};

export const useEditPost = () => {
    const userToken = useSelector(selectAuthUserToken);
    const [isEditing, setIsEditing] = useState(false);

    const editPost = async (postId, content) => {
        setIsEditing(true);
        try {
            const response = await axios.put(
                `${API_URL}/posts/${postId}`,
                {content},
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("Post edited successfully:", response.data);
        } catch (error) {
            console.error(
                "An error occurred while editing post:",
                error.response?.data || error.message
            );
        } finally {
            setIsEditing(false);
        }
    };

    return {isEditing, editPost};
};

export const useHandleLikes = () => {
    const userToken = useSelector(selectAuthUserToken);

    return async (postId, numLikes) => {
        try {
            const response = await axios.patch(
                `${API_URL}/posts/${postId}`,
                numLikes,
                {
                    headers: {
                        Authorization: `${userToken}`
                    },
                    withCredentials: true,
                }
            );

            console.log("Post likes updated successfully:", response.data);
            return response.data.likes.length;
        } catch (error) {
            console.error("Error updating post likes:",
                error.response?.data || error.message);
        }
    }
}

export const useHandleSaved = () => {
    const userToken = useSelector(selectAuthUserToken);

    return async (postId, numLikes) => {
        try {
            const response = await axios.patch(
                `${API_URL}/posts/saved/${postId}`,
                numLikes,
                {
                    headers: {
                        Authorization: `${userToken}`
                    },
                    withCredentials: true,
                }
            );

            console.log("Post saved updated successfully:", response.data);
            return response.data.saved.length;
        } catch (error) {
            console.error("Error updating saved post:",
                error.response?.data || error.message);
        }
    }
}

export const useNewPost = (selectedAward) => {
    const postUploadedImgs = useSelector(selectUploadedPostImages);
    const userToken = useSelector(selectAuthUserToken);
    const userId = useSelector(selectUser)._id;
    const navigate = useNavigate();

    return  async (values, {resetForm}) => {
        const postData = {
            ...values,
            imageUrls: postUploadedImgs,
            enabled: true,
            awardId: selectedAward?._id || ''
        };

        try {
            const response = await axios.post(
                `${API_URL}/posts`,
                postData,
                {
                    headers: {
                        Authorization: `${userToken}`
                    },
                    withCredentials: true,
                }
            );

            console.log('Post created successfully:', response.data);
            resetForm();
            navigate(`/${userId}`);
        } catch (error) {
            console.error('An error occurred while creating a post:', error.response?.data || error.message);
        }
    };
};
