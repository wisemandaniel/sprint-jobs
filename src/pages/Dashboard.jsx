/* eslint-disable */
import React, { useState, useEffect } from 'react';

import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
const suggestedContent = [
  {
    title: 'Number of completed jobs',
    description: '0',
  },
  {
    title: 'Total Number of Pending jobs',
    description: '0',
  },
  {
    title: 'Total Number of started jobs',
    description: '0',
  },
  {
    title: 'Number of jobs',
    description: '0',
  },
];

const Dashboard = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [loading, setLoading] = useState(false)
  const [numberOfUsers, setNumberOfusers] = useState(0)
  const [numberOfWorkers, setNumberOfWorkers] = useState(0)
  const [numberOfJobs, setNumberOfJobs] = useState(0)

  useEffect(() => {
    getUsers()
    getWorkers()
    getJobs()
    
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  
const getUsers = async () => {
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)

  try {
    setLoading(false) 
    const response = await fetch(`${baseUrl}protected/users?role=ROLE_USER`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + user.accessToken,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      setNumberOfusers(responseData.userResponseDTOList.length)
    } else {
      // const errorResponse = await response.json();
      // throw new Error(errorResponse);
    }
  } catch (error) {
    console.log('error: ', error.message);
  }
}

const getWorkers = async () => {
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)

  try {
    setLoading(false) 
    const response = await fetch(`${baseUrl}protected/users?role=ROLE_WORKER`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + user.accessToken,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      setNumberOfWorkers(responseData.userResponseDTOList.length)
    } else {
      
    }
  } catch (error) {
    console.log('error: ', error.message);
  }
}

const getJobs = async () => {
  const userData = localStorage.getItem('user')
  const user = JSON.parse(userData)

  try {
    setLoading(false) 
    const response = await fetch(`${baseUrl}protected/jobs`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + user.accessToken,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      setNumberOfJobs(responseData.jobResponseDTOList.length)
    } else {
      
    }
  } catch (error) {
    console.log('error: ', error.message);
  }
}

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-4/5 sm:w-1/5 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-56 w-4/5  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}
            </div>
            <div className="w-4/5 m-auto mt-8">
                
            <div className="flex flex-col mr-auto ml-auto p-8 mt-16 sm:mt-4 md:mt-4">
                <header className="bg-white p-4 shadow-md">
                  <h2 className="text-2xl font-bold">Statistics</h2>
                </header>

                <div className="p-4 mr-auto ml-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <h4 className="text-lg font-semibold text-center">Number of Users</h4>
                        <p className="text-green-600 text-center font-bold text-6xl p-6">{numberOfUsers}</p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <h4 className="text-lg font-semibold text-center">Total Number of Workers</h4>
                        <p className="text-green-600 text-center font-bold text-6xl p-6">{numberOfWorkers}</p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-md">
                        <h4 className="text-lg font-semibold text-center">Total Number of Jobs uploaded</h4>
                        <p className="text-green-600 text-center font-bold text-6xl p-6">{numberOfJobs}</p>
                      </div>
                    </div>
                </div>
              </div>  

            </div>
            
            <>
            {loading && <div>
                <LoadingSpinner />
            </div>}
    </>
    </div>
  </div>
    </div>
  );
};

export default Dashboard;
