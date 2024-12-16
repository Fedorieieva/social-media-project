const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
    deleteImageFromCloudinary
} = require("../controllers/cloudinary");

// @route   DELETE api/cloudinary/:id
// @desc    DELETE existing post
// @access  Private
router.delete(
    "/",
    passport.authenticate(
        "jwt",
        {session: false}
    ),
    deleteImageFromCloudinary,
);

module.exports = router;