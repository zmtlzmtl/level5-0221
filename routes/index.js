const express = require('express');
const router = express.Router();

const usersRouter = require("./users.route");
const postsRouter = require("./posts.route");
// const commentRouter = require("./comments.route");

router.use('/', [usersRouter]);
router.use('/posts', [postsRouter]);
// router.use('/comments', [commentRouter]); // post랑 api 확인하기

module.exports = router;