import React, { useState, useEffect } from 'react';

import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Link } from 'react-router-dom';

const AllJobs = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [user, setUser] = useState({})

  const getUser = () => {
    const userDta = localStorage.getItem('user')
    const user = JSON.parse(userDta)
    console.log('USER: ', user);
  }

  useEffect(() => {
    getUser()
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenApply, setIsOpenApply] = useState(false);
  
  const openApply = () => {
    setIsOpenApply(true);
  };

  const closeApply = () => {
    setIsOpenApply(false);
  };
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
                  {/* <button onClick={openModal} style={{backgroundColor: currentColor}} className='py-2 px-5 rounded-md text-white'>
                    Add a job
                  </button> */}
                </div>

                <div style={{backgroundColor: '#fff'}}
                     className="p-6 mt-5 rounded-lg shadow-lg mx-auto w-full m-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-400">uploaded on 01/01/2023</h3>
                  <p className="mb-4 text-gray-600">I need this document to be typed and send as a pdf file within 2 days...</p>
                  <div className="flex flex-col justify-between items-center sm:flex-row">
                    <p className="text-green-400 font-extrabold"></p>
                    <button onClick={openApply} className="text-green-400 font-extrabold shadow-lg py-2 px-5 bg-green-100 rounded-md sm:mt-7">Apply Now</button>
                  </div>
                </div>

                <div style={{backgroundColor: '#fff'}}
                     className="p-6 mt-5 rounded-lg shadow-lg mx-auto w-full m-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-400">uploaded on 01/01/2023</h3>
                  <p className="mb-4 text-gray-600">I need this document to be typed and send as a pdf file within 2 days...</p>
                  <div className="flex flex-col justify-between items-center sm:flex-row">
                    <p className="text-red-400 font-extrabold"></p>
                    <p className="text-red-400 font-extrabold shadow-lg py-2 px-5 bg-red-100 rounded-md sm:mt-7">Taken</p>
                  </div>
                </div>
                
            </div>
              
            {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-1000 ml-auto mr-auto">
              <div className="bg-gray-300 w-5/6 mt-10 rounded-lg shadow-lg sm:w-3/6 p-7">
                <div className="p-4">
                <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    // value={formValues.name}
                    // onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    // value={formValues.email}
                    // onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                    Message
                  </label>
                  <textarea name="message" rows="6" className="resize-none w-full rounded-lg border border-blue-500/20 px-4 py-3 text-slate-500 focus:border-blue-500 focus:outline-none"></textarea>
                </div>

                <div className='flex flex-row justify-between'>
                  <button
                    onClick={closeModal}
                    style={{backgroundColor: currentColor}}
                    className="hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
                </div>
              </div>
            </div>
          )}

{isOpenApply && (
            <div className="fixed inset-0 flex items-center justify-center z-1000 ml-auto mr-auto mt-10">
              <div className="bg-gray-300 w-5/6 mt-10 rounded-lg shadow-lg sm:w-3/6 p-7">
                <div className="p-4">

                  <div className='mb-10 p-5'>
                    <h2 className='text-center text-gray-600 font-bold sm:text-2xl text-xl'>Job summary</h2>
                  </div>
                  
                  <div className='mb-10 p-5'>
                    <div className='flex justify-between'>
                      <h2 className='text-center text-gray-600 font-bold sm:text-2xl text-xl'>Amount: </h2>
                      <h2 className='text-center text-green-600 font-bold sm:text-2xl text-2xl'>2100 XAF </h2>
                    </div>
                    <div className='flex justify-between mt-4'>
                      <h2 className='text-center text-gray-600 font-bold sm:text-xl text-xl'>Duration: </h2>
                      <h2 className='text-center text-gray-600 font-bold sm:text-xl text-xl'>2 days </h2>
                    </div>
                    <div className='flex justify-between mt-4'>
                      <h2 className='text-center text-gray-600 font-bold sm:text-xl text-xl'>Number of pages: </h2>
                      <h2 className='text-center text-gray-600 font-bold sm:text-xl text-xl'>22 </h2>
                    </div>
                  </div>

                <div className='flex sm:flex-row justify-between flex-col'>
                  <button
                    onClick={closeApply}
                    style={{backgroundColor: currentColor}}
                    className="hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-5"
                  >
                    Apply
                  </button>
                </div>

                </div>
              </div>
            </div>
          )}


          </div>
        </div>
    </div>
  );
};

export default AllJobs;