const Post = require("../models/Post");
const mongoose = require("mongoose");
const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

exports.createPost = (req, res, next) => {
    const postData = _.cloneDeep(req.body);
    postData.user = req.user.id;

    const newPost = new Post(queryCreator(postData));

    newPost.populate("user", "firstName lastName email avatarUrl").execPopulate();

    newPost
        .save()
        .then((post) => res.json(post))
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

exports.updatePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            }

            if (!(req.user.isAdmin || req.user.id == post.user)) {
                return res.status(403).json({
                    message: `You don't have permission to perform this action.`,
                });
            }

            const postData = _.cloneDeep(req.body);
            const updatedPost = queryCreator(postData);

            Post.findOneAndUpdate(
                {user: req.user.id, _id: req.params.id},
                {$set: updatedPost},
                {new: true},
            )
                .populate("user", "firstName lastName email avatarUrl")
                .then((post) => res.json(post))
                .catch((err) =>
                    res.status(400).json({
                        message: `Error happened on server: "${err}" `,
                    }),
                );
        })
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

exports.updatePostLikes = (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({message: "Unauthorized: User not authenticated"});
    }

    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            }

            const likes = post.likes || [];
            const likeIndex = likes.indexOf(userId);
            if (likeIndex > -1) {
                likes.splice(likeIndex, 1);
            } else {
                likes.push(userId);
            }

            return Post.findOneAndUpdate(
                {_id: req.params.id},
                {$set: {likes}},
                {new: true}
            ).populate("user", "firstName lastName email avatarUrl");
        })
        .then((post) => {
            if (post) res.json(post);
        })
        .catch((err) =>
            res.status(500).json({message: `Server error: "${err}"`})
        );
};

exports.updatePostSaved = (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({message: "Unauthorized: User not authenticated"});
    }

    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            }

            const saved = post.saved || [];
            const saveIndex = saved.indexOf(userId);
            if (saveIndex > -1) {
                saved.splice(saveIndex, 1);
            } else {
                saved.push(userId);
            }

            return Post.findOneAndUpdate(
                {_id: req.params.id},
                {$set: {saved: saved}},
                {new: true}
            ).populate("user", "firstName lastName email avatarUrl");
        })
        .then((post) => {
            if (post) res.json(post);
        })
        .catch((err) =>
            res.status(500).json({message: `Server error: "${err}"`})
        );
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id}).then((post) => {
        if (!post) {
            return res.status(404).json({
                message: `Post with id "${req.params.id}" is not found.`,
            });
        }

        if (!(req.user.isAdmin || req.user.id == post.user)) {
            return res.status(403).json({
                message: `You don't have permission to perform this action.`,
            });
        }

        Post.deleteOne({_id: req.params.id})
            .then((deletedCount) =>
                res.status(200).json({
                    message: `Post is successfully deleted from DB`,
                }),
            )
            .catch((err) =>
                res.status(400).json({
                    message: `Error happened on server: "${err}" `,
                }),
            );
    });
};

exports.getPostById = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .populate("user", "firstName lastName email avatarUrl")
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    message: `Post with id "${req.params.id}" is not found.`,
                });
            } else {
                res.json(post);
            }
        })
        .catch((err) =>
            res.status(400).json({
                message: `Error happened on server: "${err}" `,
            }),
        );
};

exports.getPostsFilterParams = async (req, res, next) => {
    const userId = req.params.userId;
    const perPage = Number(req.query.perPage) || 10;
    const startPage = Number(req.query.startPage) || 1;
    const sortField = req.query.sort || "date";

    try {
        const posts = await Post.find({ user: { $ne: userId } })
            .skip(startPage * perPage - perPage)
            .limit(perPage)
            .sort({ [sortField]: -1 });

        const postsQuantity = await Post.find({ user: { $ne: userId } });

        res.json({ posts, postsQuantity: postsQuantity.length });
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};

exports.getUserPosts = async (req, res, next) => {
    const userId = req.params.userId;
    const perPage = Number(req.query.perPage) || 10;
    const startPage = Number(req.query.startPage) || 1;
    const sortField = req.query.sort || "date";

    try {
        const posts = await Post.find({user: userId})
            .skip(startPage * perPage - perPage)
            .limit(perPage)
            .sort({ [sortField]: -1 });

        const postsQuantity = await Post.countDocuments({user: userId});

        res.json({posts, postsQuantity});
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};

exports.getUserSavedPosts = async (req, res, next) => {
    const userId = req.params.userId;
    const perPage = Number(req.query.perPage) || 10;
    const startPage = Number(req.query.startPage) || 1;
    const sortField = req.query.sort || "date";

    try {
        const posts = await Post.find({saved: userId})
            .skip((startPage - 1) * perPage)
            .limit(perPage)
            .sort({ [sortField]: -1 });

        const postsQuantity = await Post.countDocuments({saved: userId});

        res.json({posts, postsQuantity});
    } catch (err) {
        res.status(400).json({
            message: `Error occurred on the server: "${err.message}"`,
        });
    }
};

exports.getUserLikedPosts = async (req, res, next) => {
    const userId = req.params.userId;
    const perPage = Number(req.query.perPage) || 10;
    const startPage = Number(req.query.startPage) || 1;
    const sortField = req.query.sort || "date";

    try {
        const posts = await Post.find({likes: userId})
            .skip((startPage - 1) * perPage)
            .limit(perPage)
            .sort({ [sortField]: -1 });

        const postsQuantity = await Post.countDocuments({likes: userId});

        res.json({posts, postsQuantity});
    } catch (err) {
        res.status(400).json({
            message: `Error occurred on the server: "${err.message}"`,
        });
    }
};

exports.getUserPostsWithAward = async (req, res, next) => {
    const userId = req.params.userId;
    const perPage = Number(req.query.perPage) || 10;
    const startPage = Number(req.query.startPage) || 1;
    const sortField = req.query.sort || "date";

    try {
        const posts = await Post.find({
            user: userId,
            awardId: {$exists: true, $ne: null}
        })
            .skip(startPage * perPage - perPage)
            .limit(perPage)
            .sort({ [sortField]: -1 });

        const postsQuantity = await Post.countDocuments({
            user: userId,
            awardId: {$exists: true, $ne: null},
        });

        res.json({posts, postsQuantity});
    } catch (err) {
        res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};
