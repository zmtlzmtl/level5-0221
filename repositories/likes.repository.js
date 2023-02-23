const { Users, Posts, Likes } = require('../models');

class LikesRepository {
    findLike = async (postId, userId) => {
        const like = await Likes.findOne({
            where: {PostId: postId}
        })
        return like;
    };

    updatelike = async (postId, userId) => {
        
        const likePost = await Likes.create({
            PostId: postId,
            UserId: userId, //이것만 뽑는다니까 왜  parent: Error: Unknown column 'createdAt' in 'field list'
        });
        
        return likePost;
    };

    delectlike = async (postId, userId) => {
        const likePost = await Likes.destroy({
            where: ({PostId: postId, UserId: userId})
        });

        return likePost;
    }
}


module.exports = LikesRepository;