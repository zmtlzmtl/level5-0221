const CommentsRepository = require("../repositories/comments.repository");

class CommentsService {
  commentsRepository = new CommentsRepository();

  findComments = async (postId) => {
    const comments = await this.commentsRepository.findComments(postId);

    if (!comments) {
      const e = new Error("댓글이 존재하지 않습니다.");
      e.name = "404";
      throw e;
    }
    return comments.map((comments) => {
      return {        // 재가공
        commentId: comments.commentId,
        PostId: comments.PostId,
        UserId: comments["User.userId"],
        nickname: comments["User.nickname"],
        comment: comments.comment,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
      };
    });
  };

  postComments = async (postId, comment, userId) => {
    const createComment = await this.commentsRepository.postComments(
      postId,
      comment,
      userId
    );

    return createComment;
  };

  putComments = async (postId, commentId, comment, userId) => {
    const updateComment = await this.commentsRepository.putComments(
      postId,
      commentId,
      comment,
      userId
    );
    console.log(updateComment)

    if (updateComment < 1) {   //  !== 1이 되지 않았던 이유는 [ 1 ]이기 때문이다.
      const e = new Error("댓글이 정상적으로 수정되지 않았습니다.");
      e.name = "401";
      throw e;
    }

    return updateComment;
  };

  deleteComments = async (postId, commentId, userId) => {
    const destroyComment = await this.commentsRepository.deleteComments(
      postId,
      commentId,
      userId
    );

    if (destroyComment < 1) {
      const e = new Error("댓글이 정상적으로 삭제되지 않았습니다.");
      e.name = "401";
      throw e;
    }

    return destroyComment;
  };
}

module.exports = CommentsService;
