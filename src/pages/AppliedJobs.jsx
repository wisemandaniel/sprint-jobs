import React, { useEffect } from 'react';

import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Header } from '../components';

const AppliedJobs = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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
            <div className="w-1/5 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
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
              <div className="w-4/5 m-auto mt-20">

                <div style={{backgroundColor: currentColor, cursor: 'pointer' }}
                     className="p-6 mt-5 rounded-lg shadow-lg mx-auto w-full m-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">uploaded on 01/01/2023</h3>
                  <p className="mb-4 text-white">Short description here...</p>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div></div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                      <p className='text-white'> available</p>
                    </div>
                  </div>
                </div>

                <div style={{backgroundColor: currentColor, cursor: 'pointer' }}
                     className="p-6 mt-5 rounded-lg shadow-lg mx-auto w-full m-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">uploaded on 01/01/2023</h3>
                  <p className="mb-4 text-white">Short description here...</p>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div></div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                      <p className='text-white'> Taken</p>
                    </div>
                  </div>
                </div>
                
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AppliedJobs;