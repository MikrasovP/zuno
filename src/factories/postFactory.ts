import { PostService } from "../services/postService";
import PostMapper from "../mappers/postMapper";
import { Post } from "../db/post";
import { PostController } from "../controllers/postController";

export class PostServiceFactory {
    static create(): PostService {
        const postRepository = new Post();
        const postMapper = new PostMapper();
        
        return new PostService(postRepository, postMapper);
    }
} 

export class PostControllerFactory {
    static create(): PostController {
        const postService = PostServiceFactory.create();
        return new PostController(postService);
    }
}