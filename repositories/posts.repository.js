const { Posts, Users } = require('../models');
const { ValidationError } = require("../exceptions/index.exception");

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

  updatePost = async (userId, postId, title, content) => {
    const post = await Posts.update(
      { title, content },
      { where: { postId, UserId: userId } }  //둘다 고유값이라 다른게 바뀔일은 없지만
    )//기록은 바뀌겠지만 다른 사용자 오류검출 시 DB를 한번 더 불러오나?
    
    if (post < 1) {
      throw new ValidationError('게시글이 정상적으로 수정되지 않았습니다.');
    }
    return post 
  }

  deletePost = async (userId, postId) => {
    const post = await Posts.destroy({//delect 아님
      where: {postId, UserId: userId}
    })
    if (post < 1) {
      throw new ValidationError('게시글이 정상적으로 삭제되지 않았습니다.');
    }
    return post;
  }
}

module.exports = PostRepository;