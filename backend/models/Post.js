const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    imageUrls: [
      {
        type: String,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    likes: [
      {
        type: String,
        default: [],
      },
    ],
    saved: [
      {
        type: String,
        default: [],
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    awardId: {
        type: Schema.Types.ObjectId,
        ref: "awards",
        required: false,
    },
  },
  { strict: false },
);

module.exports = Post = mongoose.model("posts", PostSchema);