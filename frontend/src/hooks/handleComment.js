import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config/config.js";
import {useSelector} from "react-redux";
import {selectAuthUserToken} from "../store/selectors/index.js";

axios.defaults.withCredentials = true;

export const useFetchComments = (postId, refetch) => {
    const [comments, setComments] = useState(null);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${API_URL}/comments/post/${postId}`, {
                withCredentials: true,
            });
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (postId) fetchComments();
    }, [postId, refetch]);

    return {comments, fetchComments};
};

export const useAddComment = (postId) => {
    const userToken = useSelector(selectAuthUserToken);

    return async (values, {resetForm}) => {
        const newData = {
            post: postId,
            ...values
        };

        try {
            const response = await axios.post(
                `${API_URL}/comments`,
                newData,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );

            console.log('Comment added successfully:', response.data);
            resetForm();
        } catch (error) {
            console.error('An error occurred while adding comment:', error.response?.data || error.message);
        }
    };
};

export const useDeleteComment = () => {
    const userToken = useSelector(selectAuthUserToken);

    return async (commentId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/comments/${commentId}`,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );

            console.log("Comment deleted successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "An error occurred while deleting the comment:",
                error.response?.data || error.message
            );
            throw error;
        }
    };
};

export const useEditComment = () => {
    const userToken = useSelector(selectAuthUserToken);
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveEdit = async (commentId, content) => {
        setIsEditing(true);

        try {
            const response = await axios.put(
                `${API_URL}/comments/${commentId}`,
                {content},
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );

            console.log("Comment edited successfully:", response.data);
        } catch (error) {
            console.error(
                "An error occurred while editing the comment:",
                error.response?.data || error.message
            );
        } finally {
            setIsEditing(false);
        }
    };

    return {isEditing, handleSaveEdit};
};

export const useAllUserComments = (userId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getUserComments = async () => {
            try {
                const response = await axios.get(`${API_URL}/comments/user/${userId}`, {
                    withCredentials: true,
                });
                setComments(response.data);
                console.log("Got user comments:", response.data);
            } catch (error) {
                console.error(
                    "An error occurred while getting user comments:",
                    error.response?.data || error.message
                );
            }
        };

        if (userId) {
            getUserComments();
        }
    }, [userId]);

    return comments;
};
