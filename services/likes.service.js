const LikesRepository = require("../repositories/likes.repository");

class LikesService {
    likesRepository = new LikesRepository();

    updatelike = async (postId, userId) => {
        const findLike = await this.likesRepository.findLike(postId, userId);

        if (findLike) {
            const delpost = await this.likesRepository.delectlike(postId, userId);
            console.log('취소'+delpost)
            return delpost;
            
        } else {
            const uppost = await this.likesRepository.updatelike(postId, userId);
            console.log('성공'+uppost)
            return uppost;
        }
    } 
}

module.exports = LikesService; //딱 한번만 가는게 정답은 아니다, 줄일 수 있으면 좋은거지