import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import LandingPage from "../Components/LandingPage";
import AuthPage from "../Components/AuthPage";

import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding";
import CandidateJob from "../Components/Candidate/CandidateJobs";
import CandidateProfile from "../Components/Candidate/CandidateProfile";
import CandidateConversation from "../Components/Candidate/CandidateConversation";
import Application from "../Components/Candidate/Applications";
import Applicants from "../Components/Employer/Applicants";

import EmployerOnboarding from "../Components/Employer/Onboarding";
import EmployerJob from "../Components/Employer/Jobs";
import EmployerProfile from "../Components/Employer/Profile";
import EmployerConversation from "../Components/Employer/Conversation";
import CandidateHoc from "../Components/HOC/CandidateHoc";
import EmployerHoc from "../Components/HOC/EmployerHoc";

function Navs() {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
  const CandidateProtectedRoutes = () => {
    if (user && userInfo ?. type === 'candidate') {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  const EmployerProtectedRoutes = () => {
    if (user && userInfo ?. type === 'employer') {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate/auth" element={<AuthPage type="candidate" />} />
        <Route path="/employer/auth" element={<AuthPage type="employer" />} />
        <Route
            path="candidate/onboarding"
            element={<CandidateOnboarding />}
          />

        <Route element={<CandidateProtectedRoutes />}>
          
          <Route
            path="candidate/job"
            element={
              <CandidateHoc>
                <CandidateJob />
              </CandidateHoc>
            }
          />
          <Route
            path="candidate/profile"
            element={
              <CandidateHoc>
                <CandidateProfile />
              </CandidateHoc>
            }
          />
          <Route
            path="candidate/conversation"
            element={
              <CandidateHoc>
                <CandidateConversation />
              </CandidateHoc>
            }
          />
          <Route
            path="candidate/application"
            element={
              <CandidateHoc>
                <Application />
              </CandidateHoc>
            }
          />
        </Route>

        <Route path="employer/onboarding" element={<EmployerOnboarding />} />
        <Route element={<EmployerProtectedRoutes />}>
          <Route
            path="employer/jobs"
            element={
              <EmployerHoc>
                <EmployerJob />
              </EmployerHoc>
            }
          />
          <Route
            path="employer/profile"
            element={
              <EmployerHoc>
                <EmployerProfile />
              </EmployerHoc>
            }
          />
          <Route
            path="employer/conversation"
            element={
              <EmployerHoc>
                <EmployerConversation />
              </EmployerHoc>
            }
          />
          <Route
            path="employer/applicants"
            element={
              <EmployerHoc>
                <Applicants />
              </EmployerHoc>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;
