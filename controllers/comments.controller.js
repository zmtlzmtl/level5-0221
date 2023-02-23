const CommentsService = require("../services/comments.service");

class CommentsController {
  commentsService = new CommentsService();

  getComments = async (req, res, next) => {
    const { postId } = req.params;
    if (!postId) {
        const e = new Error('게시물이 존재하지 않습니다.');
        e.name = '412';
        throw e;
    }
    try {
      const comments = await this.commentsService.findComments(postId);

      res.status(200).json({ data: comments });
    } catch (err) {
      next(err);
    }
  };

  postComments = async (req, res, next) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const { userId } = res.locals.user;

    if (!postId || !comment) {
        const e = new Error('데이터 형식이 올바르지 않습니다.');
        e.name = '412';
        throw e;
    }
    try {
      const creataComment = await this.commentsService.postComments(
        postId,
        comment,
        userId
      );
      res.status(201).json({ data: creataComment });
    } catch (err) {
      next(err);
    }
  };

  putComments = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { comment } = req.body;
    const { userId } = res.locals.user;

    if (!postId || !commentId || !comment) {
        const e = new Error('데이터 형식이 올바르지 않습니다.');
        e.name = '412';
        throw e;
    }
    try {
      const updateComment = await this.commentsService.putComments(
        postId,
        commentId,
        comment,
        userId
      );
      res.status(200).json({ message: "수정이 완료되었습니다.", updateComment });
    } catch (err) {
      next(err);
    }
  };

  deleteComments = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;

    if (!postId || !commentId) {
        const e = new Error('데이터 형식이 올바르지 않습니다.');
        e.name = '412';
        throw e;
    }
    try {
      const destroyComment = await this.commentsService.deleteComments(
        postId,
        commentId,
        userId
      );
      res.status(200).json({ message: "삭제가 완료되었습니다.", destroyComment });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CommentsController;
