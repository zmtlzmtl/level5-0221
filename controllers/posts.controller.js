const PostService = require('../services/posts.service');
const { InvalidParamsError } = require("../exceptions/index.exception");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts })
  }

  createPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    // console.log(res.locals.user)
    const { title, content } = req.body;

    if (!title || !content) {
      throw new InvalidParamsError;
    }
    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createPostData = await this.postService.createPost( userId, title, content);

    res.status(201).json({ data: createPostData });
  }

  getSeletePost = async (req, res) => {
    const { postId } = req.params;

    const post = await this.postService.findOnePost(postId);

    res.status(200).json({ data: post })
  }
  updatePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    if (!postId || !title || !content ) {
      throw new InvalidParamsError;
    } 

    const upPost = await this.postService.updatePost(userId, postId, title, content)
    
    res.status(200).json({ messege: "수정이 완료되었습니다.", upPost})
  }

  deletePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    if (!postId) {
      throw new InvalidParamsError;
    }
    const delPost = await this.postService.deletePost(userId, postId)
    
    res.status(200).json({ messege: "수정이 완료되었습니다.", delPost})
  } 
}

module.exports = PostsController;