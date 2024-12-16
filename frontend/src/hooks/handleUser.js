import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config/config.js";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUserToken, selectUploadedProfileImage} from "../store/selectors/index.js";
import {actionSetUserData, actionSetUserToken, actionUserLoader} from "../store/reducers/auth.reducer.js";
import {useDeleteImgFromCloudinary} from "./handleCloudinary.js";
import {useNavigate} from "react-router-dom";

export const useCreateUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return async (values) => {
        try {
            const response = await axios.post(
                `${API_URL}/users`,
                {
                    ...values,
                    isAdmin: false,
                    enabled: false
                },
                {withCredentials: true} // додаємо тут
            );

            console.log('User created successfully:', response.data);
            dispatch(actionSetUserData(response.data.user));
            dispatch(actionSetUserToken(response.data.token));
            navigate('/home');
        } catch (error) {
            console.error('Registration error:', error.response.data);
        }
    };
};

export const useFetchUser = (userId, refetchTrigger) => {
    const [user, setUser] = useState(null);

    const fetchUserById = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/users/${userId}`, {
                withCredentials: true // додаємо тут
            });
            setUser(response.data);
        } catch (error) {
            console.error(
                "Error fetching user by user ID:",
                error.response?.data || error.message
            );
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUserById();
        }
    }, [userId, fetchUserById, refetchTrigger]);

    return user;
};

export const useFetchAllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/users`, {
                    withCredentials: true // додаємо тут
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error.response?.data || error.message);
            }
        };

        getAllUsers();
    }, []);

    return users;
};

export const useLogInUser = () => {
    const dispatch = useDispatch();

    const fetchAuth = async (credentials) => {
        dispatch(actionUserLoader(true));

        try {
            const response = await axios.post(
                `${API_URL}/users/login`,
                credentials,
                {withCredentials: true}
            );

            if (response.data.success) {
                const token = response.data.token;
                const id = response.data.id;

                dispatch(actionSetUserToken(token));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                await fetchUser(id);
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
        } finally {
            dispatch(actionUserLoader(false));
        }
    };

    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`, {
                withCredentials: true
            });

            if (response.data) {
                const user = response.data;
                dispatch(actionSetUserData(user));
            }
        } catch (error) {
            console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        }
    };

    return {fetchAuth};
};

export const useEditUserPassword = () => {
    const userToken = useSelector(selectAuthUserToken);

    return async (values, {resetForm}) => {
        try {
            const response = await axios.put(
                `${API_URL}/users/update-password`,
                values,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );

            console.log("User password updated successfully:", response.data);
            resetForm();
        } catch (error) {
            console.error(
                "An error occurred while editing user password:",
                error.response?.data || error.message
            );
        }
    };
};

export const useEditUserInfo = () => {
    const dispatch = useDispatch();
    const userToken = useSelector(selectAuthUserToken);
    const userUploadedImg = useSelector(selectUploadedProfileImage);

    return async (values, {resetForm}) => {
        const oldAvatarUrl = values.avatarUrl;
        const newAvatarUrl = userUploadedImg || values.avatarUrl;

        const newData = {
            ...values,
            birthdate: values.birthdate || "",
            avatarUrl: newAvatarUrl,
        };

        try {
            const response = await axios.put(
                `${API_URL}/users`,
                newData,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );

            console.log("Profile updated successfully:", response.data);

            dispatch(actionSetUserData(response.data));

            if (oldAvatarUrl && oldAvatarUrl !== newAvatarUrl) {
                await useDeleteImgFromCloudinary(oldAvatarUrl, userToken);
            }

            resetForm({values: response.data});
        } catch (error) {
            console.error(
                "An error occurred while editing profile:",
                error.response?.data || error.message
            );
        }
    };
};

export const useAssignAwardToUser = () => {
    const userToken = useSelector(selectAuthUserToken);

    return async (awardId) => {
        try {
            const response = await axios.put(
                `${API_URL}/users/awards/${awardId}`,
                {},
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );

            console.log("Award assigned successfully:", response.data);
        } catch (error) {
            console.error("Error assigning award:", error);
        }
    };
};

export const useFollowUser = () => {
    const userToken = useSelector(selectAuthUserToken);

    return useCallback(async (userId) => {
        try {
            const response = await axios.put(
                `${API_URL}/users/followers/${userId}`,
                {},
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("User followed successfully:", response.data);
        } catch (error) {
            console.error("Error following user:", error);
        }
    }, []);
};

export const useUnfollowUser = () => {
    const userToken = useSelector(selectAuthUserToken);

    return useCallback(async (userId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/users/followers/${userId}`,
                {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("User unfollowed successfully:", response.data);
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    }, []);
};