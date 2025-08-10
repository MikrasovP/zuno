import { PostService } from "../services/postService";
import { Post } from "../db/post";
import PostMapper from "../mappers/postMapper";
import { PostController } from "../controllers/postController";
import { User } from "../db/user";
import UserMapper from "../mappers/userMapper";

export class PostServiceFactory {
    static create(): PostService {
        const postRepository = new Post();
        const postMapper = new PostMapper();
        const userRepository = new User();
        const userMapper = new UserMapper();
        
        return new PostService(postRepository, postMapper, userRepository, userMapper);
    }
}

export class PostControllerFactory {
    static create(): PostController {
        const postService = PostServiceFactory.create();
        return new PostController(postService);
    }
}