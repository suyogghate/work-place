import React from 'react'
import { Routes, Route, BrowserRouter, Outlet, Navigate } from "react-router-dom";
import LandingPage from '../Components/LandingPage';
import AuthPage from '../Components/AuthPage';

import CandidateOnboarding from '../Components/Candidate/CandidateOnboarding';
import CandidateJob from '../Components/Candidate/CandidateJobs';
import CandidateProfile from '../Components/Candidate/CandidateProfile';
import CandidateConversation from '../Components/Candidate/CandidateConversation';
import Application from '../Components/Candidate/Applications';
import Applicants from '../Components/Employer/Applicants';

import EmployerOnboarding from "../Components/Employer/Onboarding";
import EmployerJob from "../Components/Employer/Jobs";
import EmployerProfile from "../Components/Employer/Profile";
import EmployerConversation from "../Components/Employer/Conversation";

function Navs() {

  const CandidateProtectedRoutes = () => {
    if('a' === 'a'){
      return <Outlet />
    }
    else{
      return <Navigate to='/'/>
    }
  }
  
  const EmployerProtectedRoutes = () => {
    if('a' === 'a'){
      return <Outlet />
    }
    else{
      return <Navigate to='/'/>
    }
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<CandidateProtectedRoutes />}>
            <Route path="candidate/onboarding" element={<CandidateOnboarding />} />
            <Route path="candidate/job" element={<CandidateJob />} />
            <Route path="candidate/profile" element={<CandidateProfile />} />
            <Route path="candidate/conversation" element={<CandidateConversation />} />
            <Route path="/application" element={<Application />} />
          </Route>

          <Route element={<EmployerProtectedRoutes />}>
            <Route path="employer/onboarding" element={<EmployerOnboarding />} />          
            <Route path="employer/jobs" element={<EmployerJob />} />          
            <Route path="employer/profile" element={<EmployerProfile />} />          
            <Route path="employer/conversation" element={<EmployerConversation />} />          
            <Route path="/applicants" element={<Applicants />} />
          </Route>          

      </Routes>
    </BrowserRouter>
  )
}

export default Navs