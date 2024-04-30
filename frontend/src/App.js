import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getToken } from "./helpers";
import 'antd/dist/antd.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

// Import loading spinner component
import LoadingSpinner from "./components/loader/LoadingSpinner";

// Lazy load your components
const Home = React.lazy(() => import("./pages/Home"));
const LeaveStatus = React.lazy(() => import("./pages/LeaveStatus"));
const Billing = React.lazy(() => import("./pages/Billing"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Profile1 = React.lazy(() => import("./components/Profile/Profile"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Login = React.lazy(() => import("./pages/Authentication/Login"));
const LeaveForm = React.lazy(() => import("./pages/LeaveForm"));
const LeaveCalendar = React.lazy(() => import("./pages/LeaveCalendar"));
// const LeaveCheck = React.lazy(() => import("./pages/LeaveCheck"));

function App() {
  return (
    <div className="App">
      {/* Wrap entire application with Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            exact
            path="/"
            element={getToken() ? <Home /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={getToken() ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={getToken() ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/leave_status"
            element={getToken() ? <LeaveStatus /> : <Navigate to="/" />}
          />
          <Route
            path="/billing"
            element={getToken() ? <Billing /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={getToken() ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/leave_form"
            element={getToken() ? <LeaveForm /> : <Navigate to="/" />}
          />
          <Route
            path="/leave_calendar"
            element={getToken() ? <LeaveCalendar /> : <Navigate to="/" />}
          />
          <Route
            path="/profile1"
            element={getToken() ? <Profile1 /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
