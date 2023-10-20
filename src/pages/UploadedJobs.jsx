import React, { useState, useEffect } from 'react';

import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Modal from '../components/Modal/Modal';

const AploadedJobs = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const postJob = () => {
    
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
            <div className="w-4/5 m-auto mt-20">

                <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                  <div></div>
                  <button onClick={openModal} style={{backgroundColor: currentColor}} className='py-2 px-5 rounded-md text-white'>
                    Add a job
                  </button>
                </div>

                <div style={{backgroundColor: '#fff'}}
                     className="p-6 mt-5 rounded-lg shadow-lg mx-auto w-full m-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-400">uploaded on 01/01/2023</h3>
                  <p className="mb-4 text-gray-600">I need this document to be typed and send as a pdf file within 2 days...</p>
                  <div className="flex flex-col justify-between items-center sm:flex-row">
                    <p className="text-green-400 font-extrabold"></p>
                    <button className="text-green-400 font-extrabold shadow-lg py-2 px-5 bg-green-100 rounded-md sm:mt-7">View more</button>
                  </div>
                </div>

                <div style={{backgroundColor: '#fff'}}
                     className="p-6 mt-5 rounded-lg shadow-lg mx-auto w-full m-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-400">uploaded on 01/01/2023</h3>
                  <p className="mb-4 text-gray-600">I need this document to be typed and send as a pdf file within 2 days...</p>
                  <div className="flex flex-col justify-between items-center sm:flex-row">
                    <p className="text-green-400 font-extrabold"></p>
                    <button className="text-green-400 font-extrabold shadow-lg py-2 px-5 bg-green-100 rounded-md sm:mt-7">View more</button>
                  </div>
                </div>
                
            </div>
            
            <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto scrollbar-hide relative z-10">
            <div className="max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Add Job</h2>
              <form>
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2 font-bold">
                  Number of pages
                </label>
                <input
                  placeholder='Enter total number of estimated pages'
                  type="number"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2 font-bold">
                  Estimated Duration
                </label>
                <input
                  placeholder='Enter total number of estimated days'
                  type="number"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 relative">
                  <label htmlFor="price" className="block mb-2 font-bold">
                    Estimated Price
                  </label>
                  <div className="relative flex items-center">
                    <input
                      placeholder='Calculated from total number of pages'
                      type="text"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                    />
                    <span className="absolute right-3 text-gray-500">XAF</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="documentType" className="block mb-2 font-bold">
                    Document Type
                  </label>
                  <select
                    id="documentType"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="passport">EXCEL</option>
                    <option value="driverLicense">PDF</option>
                    <option value="idCard">POWERPOINT</option>
                  </select>
                </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2 font-bold">
                  Description
                </label>
                <input
                  type="text"
                  placeholder='Enter brief description of what you want'
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="block mb-2 font-bold">
                  Images
                </label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </form>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => setIsOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>

          </div>
        </div>
    </div>
  );
};

export default AploadedJobs;
