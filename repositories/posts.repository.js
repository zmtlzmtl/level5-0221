const { Posts, Users } = require('../models');
const { ValidationError } = require("../exceptions/index.exception");

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll({
      raw: true,
      attributes: ["postId", "title", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["userId", "nickname"],
        }
      ],
      order: [["createdAt", "DESC"]],
    })
    return posts;
  }

  createPost = async (userId, title, content) => {
    const user = await Users.findOne({ 
      where: {
        userId
      }
    });
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({ 
      UserId: user.userId, 
      title, 
      content,
    });

    return createPostData;
  }
  findOnePost = async (postId) => {
    const post = await Posts.findOne({
      raw: true,  //데이터 벨류 외의 다른 프로퍼티를 제외하고 데이터 벨류만내보내준다.
      attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["userId", "nickname"],
        }
      ],
      where: {postId}
    });
    return post;
  }

  updatePost = async (userId, postId, title, content) => {
    const post = await Posts.update(
      { title, content },
      { where: { postId, UserId: userId } }  //둘다 고유값이라 다른게 바뀔일은 없지만
    )//기록은 바뀌겠지만 다른 사용자 오류검출 시 DB를 한번 더 불러오나?
    
    return post;
  }

  deletePost = async (userId, postId) => {
    const post = await Posts.destroy({  //delect 아님
      where: {postId, UserId: userId}
    })
    
    return post;
  }
}

module.exports = PostRepository;