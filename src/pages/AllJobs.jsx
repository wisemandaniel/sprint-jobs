/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { setImage } from '@syncfusion/ej2/spreadsheet';
import { Grid, Paper, Typography, CircularProgress } from '@mui/material';
import SmallCard from '../components/Card/Card';

const AllJobs = () => {
  const { t } = useTranslation();

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const getUser = () => {
    const userDta = localStorage.getItem('user')
    const user = JSON.parse(userDta)
    console.log('USER: ', user);
  }

  useEffect(() => {
    getUser()
    getAllJobs()
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

  const closeModal = () => {
    setIsOpen(false);
  };

  const getAllJobs = async () => {
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
        setData(responseData.jobResponseDTOList)
        console.log('JOBS: ', responseData.jobResponseDTOList);
      } else {
        // const errorResponse = await response.json();
        // throw new Error(errorResponse);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  const navigate = useNavigate()

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
            
                <Grid style={{padding: '10px', marginLeft: 'auto', marginRight: 'auto', width: '95%', marginTop: '48px'}} container spacing={2}>
                  {loading ? (
                    <Grid item xs={12} textAlign="center">
                      <CircularProgress />
                    </Grid>
                  ) : (
                    data.map(item => (
                      <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                      {/* <Paper onClick = {() => {
                        navigate(`/dashboard/AllJob/${item.id}`)
                      }} className='bg-red-400' elevation={6} style={{ padding: '24px', cursor: 'pointer', borderRadius: '0px' }}>
                         <div className='flex flex-row justify-between items-center'>
                            <Typography variant="body">From</Typography>
                            <Typography variant="h6">{item.creator.username}</Typography>
                         </div>
                         <div className='flex flex-row justify-between items-center mt-4'>
                            <Typography variant="body">Date</Typography>
                            <Typography className='text-green-500' variant="h6">{new Date(item.createdAt).toLocaleDateString()}</Typography>
                         </div>
                      </Paper> */}
                      <SmallCard 
                        onClick={() => {
                        navigate(`/dashboard/AllJob/${item.id}`);
                        }} item={item} />
                      </Grid>

                    ))
                  )}
                </Grid>

              {data.length === 0 && (
                <p className='text-white text-center text-2xl mt-24'>{t('No_job_yet')}</p>
              )}
            {/* </div> */}
              
            {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-1000 ml-auto mr-auto">
              <div className="bg-gray-300 w-5/6 mt-10 rounded-lg shadow-lg sm:w-3/6 p-7">
                <div className="p-4">
                <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    {t('Name')}
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