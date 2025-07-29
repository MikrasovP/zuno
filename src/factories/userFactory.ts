import { UserService } from "../services/userService";
import { User } from "../db/user";
import UserMapper from "../mappers/userMapper";
import { AuthController } from "../controllers/authController";

export class UserServiceFactory {
    static create(): UserService {
        const userRepository = new User();
        const userMapper = new UserMapper();
        
        return new UserService(userRepository, userMapper);
    }
}

export class AuthControllerFactory {
    static create(): AuthController {
        const userService = UserServiceFactory.create();
        return new AuthController(userService);
    }
}

