import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Post } from './src/db/post';
import { User } from './src/db/user';
import authRoutes from './src/routes/auth';
import postRoutes from './src/routes/post';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));
app.use(bodyParser.json());

(async () => {
  await User.insertDemoUsers();
  await Post.insertDemoPosts();
})();

authRoutes(app);
postRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 