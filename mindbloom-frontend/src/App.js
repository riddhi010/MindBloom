import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cursor from "./components/cursor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MoodTrackerPage from "./pages/MoodTracker";
import ProtectedRoute from "./components/ProtectedRoute"; 
import AIChatPage from "./pages/AIChatPage";
import MyAccount from "./pages/MyAccount";
import Journal from "./pages/Journal";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AnonymousWall from "./components/AnonymousWall";



function App() {
  return (
    <>
      <Cursor />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood-tracker"
            element={
              <ProtectedRoute>
                <MoodTrackerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <AIChatPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />

          <Route
            path="/anowall"
            element={
              <ProtectedRoute>
                <AnonymousWall />
              </ProtectedRoute>
            }
          />

          
        </Routes>
        
        
        
      </Router>
    </>
  );
}

export default App;
