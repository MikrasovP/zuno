import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import FeedPage from './pages/FeedPage';

// Placeholder components for other routes
const LoginPage = () => <div className="container mx-auto px-4 py-8">Login Page (Coming Soon)</div>;
const SignupPage = () => <div className="container mx-auto px-4 py-8">Signup Page (Coming Soon)</div>;
const NewPostPage = () => <div className="container mx-auto px-4 py-8">New Post Page (Coming Soon)</div>;
const ProfilePage = () => <div className="container mx-auto px-4 py-8">Profile Page (Coming Soon)</div>;
const UserProfilePage = () => <div className="container mx-auto px-4 py-8">User Profile Page (Coming Soon)</div>;
const BlogPostPage = () => <div className="container mx-auto px-4 py-8">Blog Post Page (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/new" element={<NewPostPage />} />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/u/:username" element={<UserProfilePage />} />
          <Route path="/u/:username/:slug" element={<BlogPostPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
