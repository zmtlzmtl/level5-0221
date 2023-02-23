const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

// router.get('/likes', likesController.getLkies);
router.put('/:postId/likes', authMiddleware, likesController.updatelike);

module.exports = router;