import axios from "axios";
import {API_URL} from "../config/config.js";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

axios.defaults.withCredentials = true;

export const useAnotherFetchPosts = (endpoint, params, queryKey) => {
    const fetchPosts = async ({pageParam = 1}) => {
        try {
            const response = await axios.get(
                `${API_URL}/${endpoint}`,
                {
                    params: {
                        ...params,
                        startPage: pageParam,
                    },
                    withCredentials: true,
                }
            );
            return response.data.posts;
        } catch (error) {
            console.error("Error fetching posts:", error.response?.data || error.message);
            return [];
        }
    };

    return useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length > 0 ? pages.length + 1 : undefined;
        },
        initialData: {
            pages: [[]],
            pageParams: [1],
        },
    });
};

export const useFetchUserPostsNumber = (endpoint) => {
    const [postsNum, setPostsNum] = useState(null);

    useEffect(() => {
        const fetchPosts = async ({pageParam = 1, perPage = 1} = {}) => {
            try {
                const response = await axios.get(
                    `${API_URL}/${endpoint}`,
                    {
                        params: {
                            perPage: perPage,
                            startPage: pageParam,
                        },
                        withCredentials: true,
                    }
                );
                setPostsNum(response.data.postsQuantity);
            } catch (error) {
                console.error("Error fetching posts:", error.response?.data || error.message);
                setPostsNum(0);
            }
        };

        if (endpoint) {
            fetchPosts();
        }
    }, [endpoint]);

    return postsNum;
};
