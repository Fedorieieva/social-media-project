import React, {useEffect, useRef, useState} from "react";
import {useIntersection} from "@mantine/hooks";
import style from './style.module.scss';
import ProfileFeedCard from "./ProfileFeedCard.jsx";
import {useAnotherFetchPosts} from "../../../hooks/fetchPosts.js";
import PropTypes from "prop-types";

const CardFeed = ({queryKey, fetchUrl, userId}) => {
    const [posts, setPosts] = useState([]);
    const lastPostRef = useRef(null);

    const {data, fetchNextPage, isFetchingNextPage} = useAnotherFetchPosts(fetchUrl, {perPage: 3}, queryKey);

    const {ref, entry} = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    useEffect(() => {
        // fetchNextPage();

        if (data) {
            const newPosts = data.pages.flatMap((page) => page);
            setPosts(newPosts);
        }

        return () => {
            data.pages = [];
        };
    }, [data, fetchNextPage, userId]);

    useEffect(() => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage, isFetchingNextPage, queryKey, fetchUrl]);

    if (!posts || posts.length === 0) {
        return <div>No posts available</div>;
    }

    return (
        <section className={style.userFeed}>
            {posts.map((post, i) => (
                <ProfileFeedCard
                    key={post._id}
                    ref={i === posts.length - 1 ? ref : null}
                    post={post}
                />
            ))}
        </section>
    );
};

CardFeed.propTypes = {
    queryKey: PropTypes.string,
    fetchUrl: PropTypes.string,
    userId: PropTypes.string
};

export default CardFeed;
