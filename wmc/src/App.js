import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage'; 
import EventPage from './pages/EventPage';
import DonationPage from './pages/DonationPage'; 
import MembershipPage from './pages/MembershipPage'; // Adjust the path as needed
import ProfilePage from './pages/ProfilePage'; // Adjust the import path as necessary
import StoryPage from './pages/StoryPage'; // Import StoryPage

const App = () => {
  
  
  const user = JSON.parse(localStorage.getItem('user')); 
  console.log('User from localStorage:', user);
  const NotFoundPage = () => {
    return <div>Page Not Found</div>;
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {user && user.role === "admin" && (
          <Route path="/admin" element={<AdminPage />} />
        )}
        {user && user.role === "member" && (
          <Route path="/home" element={<HomePage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/donate" element={<DonationPage/>} />
        <Route path="/membership" element={<MembershipPage/>} />
        <Route path="/profile" element={<ProfilePage userId={user ? user.id : ''} />} /> 
        <Route path="/stories" element={<StoryPage />} /> {/* Add route for StoryPage */}
        </Routes>
    </Router>
  );
};

export default App;
