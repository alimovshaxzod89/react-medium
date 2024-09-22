// src/routes/Router.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import StoryDraft from '../pages/StoryDraft';
import ProfilePage from '../pages/ProfilePage';
import LibraryPage from '../pages/LibraryPage';
import PostDetail from '../pages/PostDetail';

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/storyDraft" element={<StoryDraft />} />
            <Route path="/profilPage" element={<ProfilePage />} />
            <Route path="/libraryPage" element={<LibraryPage />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
    </Router>
  );
};

export default AppRouter;
