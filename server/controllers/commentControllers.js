const { User, Recipe, Comment } = require('../models');

module.exports = {

    // get all comments

    async getAllComments(req, res) {
        const comments = await Comment.find();
        return res.json(comments);
    },

    // get one comment by id
    async getCommentById({ params }, res) {
        const comment = await Comment.findOne({ _id: params.id });
        return res.json(comment);
    },

    // create a comment
    async createComment({ body }, res) {
        const comment = await Comment.create(body);
        await Recipe.findOneAndUpdate(
            { _id: body.recipeId },
            { $addToSet: { comments: comment._id } },
            { new: true, runValidators: true }
        );
        return res.json(comment);
    },

    // update a comment by id
    async updateComment({ params, body }, res) {
        const comment = await Comment
            .findOneAndUpdate({ _id : params.id
            }, body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).json({ message: 'No comment with this id!' });
        }
        return res.json(comment);
    },  

    // delete a comment by id
    async deleteComment({ params }, res) {
        const comment = await Comment.findOneAndDelete({ _id: params.id });
        if (!comment) {
            return res.status(404).json({ message: 'No comment with this id!' });
        }
        return res.json(comment);
    }

};