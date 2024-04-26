import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UpdateProfile from "./UserComponents/UpdateProfile";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserProfile from "./UserComponents/UserProfile";
import Dealer from "./UserComponents/Dealer";
import OwnCars from "./UserComponents/OwnCars";
import DealerInfo from "./UserComponents/DealerInfo";
import DealerDshboard from "./pages/DealerDshboard";
import DealerProfile from "./DealerComponents/DealerProfile";
import PostCars from "./DealerComponents/PostCars";
import PostDeals from "./DealerComponents/PostDeals";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dealer/dashboard"
            element={
              <ProtectedRoute>
                <DealerDshboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dealer/dashboard/profile"
            element={
              <ProtectedRoute>
                <DealerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dealer/dashboard/postcars"
            element={
              <ProtectedRoute>
                <PostCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dealer/dashboard/postdeals"
            element={
              <ProtectedRoute>
                <PostDeals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard/Profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard/Dealers"
            element={
              <ProtectedRoute>
                <Dealer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard/Cars"
            element={
              <ProtectedRoute>
                <OwnCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard/Dealers/:id"
            element={
              <ProtectedRoute>
                <DealerInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/updateProfile/"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
