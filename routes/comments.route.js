const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/:postId/comments', commentsController.getComments);
router.post('/:postId/comments', authMiddleware, commentsController.postComments);
router.put('/:postId/comments/:commentId', authMiddleware, commentsController.putComments);
router.delete('/:postId/comments/:commentId', authMiddleware, commentsController.deleteComments);

module.exports = router;