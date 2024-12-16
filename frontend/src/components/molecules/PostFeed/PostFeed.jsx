import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import style from './style.module.scss';
import Post from "../../organisms/Post/Post.jsx";
import {useIntersection} from "@mantine/hooks";
import {useAnotherFetchPosts} from "../../../hooks/fetchPosts.js";
import cn from 'classnames';

const PostFeed = ({fetchUrl, queryKey, className}) => {
    const [posts, setPosts] = useState([]);
    const lastPostRef = useRef(null);

    const {data, fetchNextPage, isFetchingNextPage} = useAnotherFetchPosts(fetchUrl, {perPage: 1}, queryKey);

    const {ref, entry} = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    useEffect(() => {
        if (data) {
            const newPosts = data.pages.flatMap((page) => page);
            setPosts(newPosts);
        }

        return () => {
            data.pages = [];
        }
    }, [data]);

    useEffect(() => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage, isFetchingNextPage]);

    return (
        <div className={cn(style.postFeed, className)}>
            {posts?.map((post, index) => {
                const isLastPost = index === posts.length - 1;

                return (
                    <Post
                        post={post}
                        key={post._id}
                        ref={isLastPost ? ref : null}
                    />
                );
            })}
            {isFetchingNextPage && <div>Loading more posts...</div>}
        </div>
    );
};

PostFeed.propTypes = {
    fetchUrl: PropTypes.string,
    queryKey: PropTypes.string,
    className: PropTypes.string
}

export default PostFeed;
