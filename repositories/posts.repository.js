const { Posts, Users } = require('../models');


class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();

    return posts;
  }

  createPost = async (userId, title, content) => {
    const user = await Users.findOne({ 
      where: {
        userId
      }
    });
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    console.log(user)
    const createPostData = await Posts.create({ 
      UserId: user.userId,
      nickname: user.nickname, 
      title, 
      content,
    });

    return createPostData;
  }
  findOnePost = async (postId) => {
    const posts = await Posts.findOne({postId});
  }
}

module.exports = PostRepository;