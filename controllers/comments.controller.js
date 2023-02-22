const CommentsService = require('../services/comments.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class CommentsController {
    commentsService = new CommentsService();

    getComments = async (req, res) => {
        const { postId } = req.params;
    
        const comments = await this.commentsService.findComments( postId );

        if (!postId) {
            throw new InvalidParamsError;
        }
        res.status(200).json({ data : comments })
    }

    postComments = async (req, res) => {
        const { postId } = req.params;
        const { comment } = req.body;
        const { userId } = res.locals.user;
        const creataComment = await this.commentsService.postComments(postId, comment ,userId);
        
        if (!postId) {
            throw new InvalidParamsError;
        }
        res.status(200).json({ data : creataComment })
    }
    putComments = async (req, res) => {
        const { postId, commentId } = req.params;
        const { comment } = req.body;
        const { userId } = res.locals.user;

        const updateComment = await this.commentsService.putComments( postId, commentId, comment, userId)
    
        if (!postId || !commentId) {
            throw new InvalidParamsError;
        }
        res.status(200).json({ messege: "수정이 완료되었습니다.", updateComment })
    }

    deleteComments = async (req, res) => {
        const { postId, commentId } = req.params;
        const { userId } = res.locals.user;

        const destroyComment = await this.commentsService.deleteComments( postId, commentId, userId)
    
        if (!postId || !commentId) {
            throw new InvalidParamsError;
        }
        res.status(200).json({ messege: "삭제가 완료되었습니다.", destroyComment })
    }
}

module.exports = CommentsController;