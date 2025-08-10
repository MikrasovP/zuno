import { UserService } from "../services/userService";
import { User } from "../db/user";
import UserMapper from "../mappers/userMapper";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";

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

export class UserControllerFactory {
    static create(): UserController {
        const userService = UserServiceFactory.create();
        return new UserController(userService);
    }
}

