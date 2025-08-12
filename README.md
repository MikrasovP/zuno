# 🚀 Zuno - Modern Full-Stack Blogging Platform

A sophisticated, production-ready blogging platform built with modern web technologies. This project demonstrates full-stack development capabilities with a focus on performance, scalability, and user experience.

![Zuno Platform](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 🌟 Live Demo

[**Frontend**](https://zuno-frontend-production.up.railway.app)

## ✨ Features

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Built with Radix UI and custom components
- **Real-time Updates**: Optimistic UI updates with proper error handling

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Protection**: Properly configured for production deployment
- **Session Management**: Cookie-based session handling

### 📝 Content Management
- **Rich Text Editor**: Markdown support with preview functionality

### 🚀 Performance & Scalability
- **TypeScript**: Full type safety across the stack
- **Database Optimization**: Efficient queries with Prisma ORM
- **Caching Strategy**: Ready for Redis integration
- **CDN Ready**: Optimized for content delivery networks

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **Prisma** - Modern database ORM
- **PostgreSQL** - Reliable relational database
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development & Deployment
- **Docker** - Containerization for consistent environments
- **Railway** - Cloud deployment platform
- **ESLint** - Code linting and formatting
- **Mocha & Chai** - Testing framework
- **Git** - Version control

### Database Schema
- **Users**: Authentication, profiles, and user management
- **Posts**: Blog posts with rich content support
- **Relationships**: Proper foreign key constraints and cascading

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • TypeScript    │    │ • TypeScript    │    │ • Prisma ORM    │
│ • Tailwind CSS  │    │ • JWT Auth      │    │ • Migrations    │
│ • Vite          │    │ • CORS          │    │ • Relations     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```


## 📚 API Documentation

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/validate` - Token validation

### Post Endpoints
- `GET /feed` - Get paginated posts
- `GET /post/:id` - Get single post
- `POST /posts` - Create new post
- `GET /user/:id/posts` - Get user's posts

### User Endpoints
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

## 🚀 Deployment

### Railway Deployment
This project is configured for Railway deployment with:
- **Docker containers** for consistent environments
- **Environment variables** for configuration
- **PostgreSQL service** for database
- **Automatic deployments** from Git


## 📁 Project Structure

```
zuno/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API client functions
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Layout components
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── Dockerfile          # Frontend container
├── backend/                # Express.js backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── models/         # Data models
│   │   ├── db/            # Database configuration
│   │   └── utils/         # Utility functions
│   ├── prisma/            # Database schema and migrations
│   └── Dockerfile         # Backend container
└── railway.json           # Railway deployment config
```


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Built with ❤️ using modern web technologies**

*This project showcases full-stack development skills with a focus on production-ready applications, modern architecture patterns, and best practices in web development.*
