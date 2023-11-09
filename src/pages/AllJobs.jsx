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

const Card = ({ item }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const startJob = async (jobId) => {

    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    setLoading(true)

    const data = {
      "jobId": jobId,
    }

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/jobs/start?jobId=${jobId}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Successfully started this job')
      } else {
        
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      console.log('error: ', error.message);
    }
  }

  return (
    <div>
        <div style={{backgroundColor: '#fff'}}
                className="p-3 mt-5 rounded-lg shadow-lg mx-auto sm:w-5/6 m-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-400">{t('uploaded_on')} {item.createdAt.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1')}</h3>
            <p className="mb-4 text-gray-600">{item.description}</p>
            <div className="flex flex-col justify-between items-center sm:flex-row">
              <p className="text-green-400 font-extrabold"></p>
              {!(item.jobTaken) && <button onClick={() => 
              {
                  navigate(`/dashboard/AllJob/${item.id}`) 
              }
            } className="text-green-400 font-extrabold shadow-lg py-2 px-5 bg-green-100 rounded-md sm:mt-7">Start job</button>}

              {item.jobTaken && <button disabled className="text-red-400 font-extrabold shadow-lg py-2 px-5 bg-red-100 rounded-md sm:mt-4">{t('taken')}</button>}
            </div>
        </div>
      

        {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative z-10">
            <div className="max-h-96 overflow-y-auto">
              <div className='flex justify-between'>
                 <p className="text-xl mb-6">Number of days: </p> 
                 <h2 className="text-2xl font-bold mb-6">{item.numberOfDays}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text-xl mb-6">Number of pages: </p> 
                 <h2 className="text-2xl font-bold mb-6">{item.numbersOfPages}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text-xl mb-6">Amount: </p> 
                 <h2 className="text-2xl font-bold mb-6 text-green-400">{item.amount} { item.currency}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text-xl mb-6">Document type: </p> 
                 <h2 className="text-2xl font-bold mb-6">{item.documentType}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text-xl mb-6">Status: </p> 
                 {item.jobTaken && <h2 className="text-2xl text-green-400 font-bold mb-6">Started</h2>}  
                 {!item.jobTaken && <h2 className="text-2xl text-red-400 font-bold mb-6">Not started</h2>} 
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => startJob(item.id)}
                  className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
                >
                  start job
                </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
      const response = await fetch(`${baseUrl}protected/jobs?pageNo=${0}&pageSize=${10}`, {
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
           
            <div className="w-4/5 m-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-3 gap-1">
              {data.map((card, index) => (
                <Card key={index} item={card} />
              ))}

              {data.length === 0 && (
                <p className='text-white text-center text-2xl mt-24'>{t('No_job_yet')}</p>
              )}
            </div>
              
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