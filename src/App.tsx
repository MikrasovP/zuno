import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import FeedPage from './pages/FeedPage';
import DetailedPostPage from './pages/DetailedPostPage';
import ProfilePage from './pages/ProfilePage';
import { AuthStateProvider } from './context/AuthStateContext';
import { SidePanelProvider } from './context/SidePanelContext';

// Placeholder components for other routes
const NewPostPage = () => <div className="container mx-auto px-4 py-8">New Post Page (Coming Soon)</div>;
const UserProfilePage = () => <div className="container mx-auto px-4 py-8">User Profile Page (Coming Soon)</div>;

function App() {
  return (
    <AuthStateProvider>
      <SidePanelProvider>
        <Router>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<FeedPage />} />
              <Route path="/new" element={<NewPostPage />} />
              <Route path="/me" element={<ProfilePage />} />
              <Route path="/u/:username" element={<UserProfilePage />} />
              <Route path="/post/:id" element={<DetailedPostPage />} />
            </Route>
          </Routes>
        </Router>
      </SidePanelProvider>
    </AuthStateProvider>
  );
}

export default App;
