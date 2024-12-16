import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../config/config.js";

axios.defaults.withCredentials = true;

export const useFetchAwardById = (awardId) => {
    const [award, setAward] = useState(null);

    const fetchAwardById = useCallback(async () => {
        if (!awardId) return;

        try {
            const response = await axios.get(`${API_URL}/awards/${awardId}`, {
                withCredentials: true,
            });
            setAward(response.data);
        } catch (error) {
            console.error(
                "Error fetching award by award ID:",
                error.response?.data || error.message
            );
        }
    }, [awardId]);

    useEffect(() => {
        fetchAwardById();
    }, [fetchAwardById]);

    return award;
};

export const useFetchAllAwards = () => {
    const [awards, setAwards] = useState([]);

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await axios.get(`${API_URL}/awards`, {
                    withCredentials: true,
                });

                setAwards(response.data);
            } catch (error) {
                console.error(
                    "An error occurred while fetching awards:",
                    error.response?.data || error.message
                );
            }
        };

        fetchAwards();
    }, []);

    return awards;
};
