const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Comment = model('comment', commentSchema);
module.exports = Comment;