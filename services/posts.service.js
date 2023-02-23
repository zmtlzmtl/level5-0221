const PostRepository = require("../repositories/posts.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    if (!allPost) {
      const e = new Error("게시물이 존재하지 않습니다.");
      e.name = "404";
      throw e;
    }
    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map((post) => {
      return {
        postId: post.postId,
        UserId: post["User.userId"],
        nickname: post["User.nickname"],
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }; //content를 보여주지 않으려고
    });
  };

  createPost = async (userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );
    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return createPostData;
  };

  findOnePost = async (postId) => {
    const onePost = await this.postRepository.findOnePost(postId); //저장소에서 바꿔야함

    if (!onePost) {
      const e = new Error("게시물이 존재하지 않습니다.");
      e.name = "404";
      throw e;
    }

    return {
      postId: onePost.postId,
      UserId: onePost["User.userId"],
      nickname: onePost["User.nickname"],
      title: onePost.title,
      content: onePost.content,
      createdAt: onePost.createdAt,
      updatedAt: onePost.updatedAt,
    };
  };

  updatePost = async (userId, postId, title, content) => {
    const upPost = await this.postRepository.updatePost(
      userId,
      postId,
      title,
      content
    );

    if (upPost < 1) {     //  !== 1이 되지 않았던 이유는 [ 1 ]이기 때문이다.
      const e = new Error("게시글이 정상적으로 수정되지 않았습니다.");
      e.name = "401";
      throw e;
    }
    return upPost;
  };

  deletePost = async (userId, postId) => {
    const delPost = await this.postRepository.deletePost(userId, postId);

    if (delPost < 1) {
      const e = new Error("게시글이 정상적으로 삭제되지 않았습니다.");
      e.name = "401";
      throw e;
    }
    return delPost;
  };
}

module.exports = PostService;
