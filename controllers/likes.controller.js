const LikesService = require("../services/likes.service");

class LikesController {
  likesService = new LikesService();

  updatelike = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    console.log(postId,userId)
    if (!postId) {
      const e = new Error("데이터 형식이 올바르지 않습니다.");
      e.name = "412";
      throw e;
    }
    
      const likepost = await this.likesService.updatelike(postId, userId);
      console.log(likepost)
      if (likepost === 1) {   //!likepost
        res.status(200).json({ message: "좋아요가 취소되었습니다." });
      } else {
        res.status(200).json({ message: "좋아요를 누르셨습니다." });
      }
        //  console.log(likepost)
        // res.status(200).json({ data: likepost });
    
  };
}

module.exports = LikesController;
