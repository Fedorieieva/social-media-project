const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
    createPost,
    updatePost,
    updatePostLikes,
    deletePost,
    getPostById,
    getPostsFilterParams,
    getUserPosts,
    getUserPostsWithAward,
    updatePostSaved,
    getUserSavedPosts,
    getUserLikedPosts,
} = require("../controllers/post");

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post("/", passport.authenticate(
    "jwt", {session: false}),
    createPost
);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    updatePost,
);

// @route   PATCH api/posts/:id
// @desc    Update post likes
// @access  Private
router.patch(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    updatePostLikes,
);

// @route   PATCH api/posts/saved/:id
// @desc    Update post likes
// @access  Private
router.patch(
    "/saved/:id",
    passport.authenticate("jwt", {session: false}),
    updatePostSaved,
);

// @route   DELETE api/posts/:id
// @desc    DELETE existing post
// @access  Private
router.delete(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    deletePost,
);

// @route   GET api/posts/:userId
// @desc    GET appropriate filtered posts
// @access  Public
router.get("/:userId", getPostsFilterParams);

// @route   GET api/posts/:id
// @desc    GET existing post
// @access  Public
router.get("/:id", getPostById);

// @route   GET api/posts/user/:userId/award
// @desc    GET all posts by the authenticated user that have an awardId
// @access  Public
router.get( "/user/:userId/award", getUserPostsWithAward);

// @route   GET api/posts/user/:userId
// @desc    GET all posts by the authenticated user
// @access  Public
router.get("/user/:userId", getUserPosts);

// @route   GET api/posts/user/:userId/saved
// @desc    GET all posts by the authenticated user
// @access  Public
router.get("/user/:userId/saved", getUserSavedPosts);

// @route   GET api/posts/user/:userId/liked
// @desc    GET all posts by the authenticated user
// @access  Public
router.get("/user/:userId/liked", getUserLikedPosts);

module.exports = router;
