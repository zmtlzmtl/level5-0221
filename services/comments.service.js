const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
    commentsRepository = new CommentsRepository();

    findComments = async (postId) => {
        const comments = await this.commentsRepository.findComments(postId);
        
        comments.sort((a,b) => {
            return b.createdAt - a.createdAt;
        })

        console.log(comments);
        return comments;
    }

    postComments = async (postId, comment, userId) => {
        const createComment = await this.commentsRepository.postComments(postId, comment, userId)

        return createComment;
    }
    putComments = async (postId, commentId, comment, userId) => {
        const updateComment = await this.commentsRepository.putComments(postId, commentId, comment, userId)
        
        return updateComment;
    }

    deleteComments = async (postId, commentId, userId) => {
        const destroyComment = await this.commentsRepository.deleteComments(postId, commentId, userId)
        
        return destroyComment;
    }
}


module.exports = CommentsService;