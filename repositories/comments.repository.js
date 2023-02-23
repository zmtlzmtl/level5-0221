const { Users, Comments } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

class CommentsRepository {
  findComments = async (postId) => {
    const comments = await Comments.findAll({
      raw: true,
      attributes: ['commentId',"PostId", 'comment', "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["userId", "nickname"],
        },
      ],
      where: { PostId: postId },
      order: [["createdAt", "DESC"]],
    });
    return comments;
  };

  postComments = async (postId, comment, userId) => {
    const user = await Users.findOne({
      where: { userId },
    });

    const createComment = await Comments.create({
      UserId: user.userId,
      PostId: postId,
      comment,
    });
    return createComment;
  };
  putComments = async (postId, commentId, comment, userId) => {
    const updateComment = await Comments.update(
      { comment },
      { where: { PostId: postId, UserId: userId, commentId } }
    );
    
    return updateComment;
  };

  deleteComments = async (postId, commentId, userId) => {
    const destroyComment = await Comments.destroy({
      where: { PostId: postId, UserId: userId, commentId },
    });
    
    return destroyComment;
  };
}
module.exports = CommentsRepository;
