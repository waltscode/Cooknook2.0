const router = require('express').Router();
const { getAllComments, getCommentById, updateComment, deleteComment } = require('../../controllers/commentControllers');



router.route('/').get(getAllComments);
router.route('/:id').get(getCommentById) .put(updateComment).delete(deleteComment) ;



module.exports = router;