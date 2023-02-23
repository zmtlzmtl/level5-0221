const PostService = require("../services/posts.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
      const posts = await this.postService.findAllPost();

      res.status(200).json({ data: posts });
    } catch (error) {
      next(error);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user; //해당하는 user의 데이터가 다 나옴
      // console.log(res.locals.user)
      const { title, content } = req.body;

      if (!title || !content) {
        const e = new Error("제목이나 내용이 존재하지 않습니다.");
        e.name = "412";
        throw e;
      }
      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createPostData = await this.postService.createPost(
        userId,
        title,
        content
      );

      res.status(201).json({ data: createPostData });
    } catch (error) {
      next(error);
    }
  };

  getSeletePost = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await this.postService.findOnePost(postId);

      res.status(200).json({ data: post });
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;

    if (!postId || !title || !content) {
      const e = new Error("데이터 형식이 올바르지 않습니다.");
      e.name = "412";
      throw e;
    }
    try {
      const upPost = await this.postService.updatePost(
        userId,
        postId,
        title,
        content
      );

      res.status(200).json({ message: "수정이 완료되었습니다.", upPost });
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    if (!postId) {
      const e = new Error("데이터 형식이 올바르지 않습니다.");
      e.name = "412";
      throw e;
    }
    try {
      const delPost = await this.postService.deletePost(userId, postId);

      res.status(200).json({ message: "수정이 완료되었습니다.", delPost });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostsController;
