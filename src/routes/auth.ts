import { register, login } from '../controllers/authController';

export default (app: any) => {
  app.post('/register', register);
  app.post('/login', login);
}; 