const { Users, Comments } = require('../models');
const { ValidationError } = require('../exceptions/index.exception');

class CommentsRepository {
    findComments = async (postId) => {
        const comments = await Comments.findAll(postId);

        if(!comments) {
            throw new ValidationError('해당하는 댓글이 존재하지 않습니다.')
        }
        return comments;
    }

    postComments = async (postId, comment, userId) => {
        const user = await Users.findOne({
            where: {userId}
        });

        const createComment = await Comments.create({
            UserId: user.userId,
            PostId: postId,  //migretion에서 정의해준대로 달랑 postId, ㄴㄴ 
            comment,
        })
        return createComment;
    }
    putComments = async (postId, commentId, comment, userId) => {
        const updateComment = await Comments.update(
            {comment},
            {where: { PostId: postId, UserId: userId, commentId}}
        );
        if (updateComment < 1) {
            throw new ValidationError('게시글이 정상적으로 수정되지 않았습니다.');
        }
        return updateComment;
    }

    deleteComments = async (postId, commentId, userId) => {
        const destroyComment = await Comments.destroy(
            {where: { PostId: postId, UserId: userId, commentId}}
        );
        if (destroyComment < 1) {
            throw new ValidationError('게시글이 정상적으로 삭제되지 않았습니다.');
        }
        return destroyComment;
    }
}
module.exports = CommentsRepository;
