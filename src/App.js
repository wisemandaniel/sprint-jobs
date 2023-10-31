import React from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { AllJobs } from './pages';
import {UploadedJobs} from './pages';
import {AppliedJobs} from './pages';
import {Workers} from './pages';
import {Users} from './pages';
import {ProfileScreen} from './pages'

import Registration from './pages/Registration';
import Login from './pages/Login';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={(<Landing />)} />
      <Route path="/dashboard/*" element={(<Dashboard />)} />
      <Route path="/dashboard/AllJobs" element={(<AllJobs />)} />
      <Route path="/dashboard/UploadedJobs" element={(<UploadedJobs />)} />
      <Route path="/dashboard/AppliedJobs" element={(<AppliedJobs />)} />
      <Route path="/dashboard/Users" element={(<Users />)} />
      <Route path="/dashboard/Workers" element={(<Workers />)} />
      <Route path="/dashboard/ProfileScreen" element={(<ProfileScreen />)} />
      <Route path="/Registration" element={(<Registration />)} />
      <Route path="/Login" element={(<Login />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;