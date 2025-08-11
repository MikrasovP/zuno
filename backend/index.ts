import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/auth';
import postRoutes from './src/routes/post';
import userRoutes from './src/routes/user';

const app = express();

console.log(process.env.FRONTEND_URL);
// CORS configuration
app.use(cors({
  origin: [process.env.FRONTEND_URL as string, 'http://localhost:5173'],
  credentials: true,
}));

// Body parser configuration - handle different content types
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


authRoutes(app);
postRoutes(app);
userRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 