const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map(post => {
      return {
        postId: post.postId,
        userId: post.UserId,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }
    });
  }

  createPost = async (userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost(userId, title, content);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return createPostData;
  }

  findOnePost = async (postId) => {

    const onePost = await this.postRepository.findOnePost(postId);

    return {
      postId: onePost.postId,
      userId: onePost.userId,
      nickname: onePost.nickname,
      title: onePost.title,
      content: onePost.content,
      createdAt: onePost.createdAt,
      updatedAt: onePost.updatedAt,
    };
  }

  updatePost = async (userId, postId, title, content) => {

    const upPost = await this.postRepository.updatePost(userId, postId, title, content);
    return upPost;
  }

  deletePost = async (userId, postId) => {
  
    const delPost = await this.postRepository.deletePost(userId, postId);
    return delPost;
  }
}

module.exports = PostService;