/* eslint-disable */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { AllJobs, JobDetail, UploadedJobs, AppliedJobs, Workers, Users, 
  ProfileScreen, 
  AllJobDetail,
  JobImages,
  AppliedJobDetail,
} from './pages';

import Registration from './pages/Registration';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/AllJobs" element={<AllJobs />} />
        <Route path="/dashboard/Job/:jobId" element={<JobDetail />} />
        <Route path="/dashboard/AllJob/:jobId" element={<AllJobDetail />} />
        <Route path="/dashboard/AppliedJob/:jobId" element={<AppliedJobDetail />} />
        <Route path="/dashboard/JobImages/:jobId" element={<JobImages />} />
        <Route path="/dashboard/UploadedJobs" element={<UploadedJobs />} />
        <Route path="/dashboard/AppliedJobs" element={<AppliedJobs />} />
        <Route path="/dashboard/Users" element={<Users />} />
        <Route path="/dashboard/Workers" element={<Workers />} />
        <Route path="/dashboard/ProfileScreen" element={<ProfileScreen />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
