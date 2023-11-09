import React, { useState, useEffect } from 'react';

import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Modal from '../components/Modal/Modal';

import SnackMessage from '../components/SnackBar/Snackbar';
import ErrorSnackMessage from '../components/ErrorSnackbar/ErrorSnackbar';

const Workers = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const [message, setMessage] = useState("")
  const [errorText, setErrorText] = useState("")
  const [errorSnack, setErrorSnack] = useState(false)
  const [successSnack, setSuccessSnack] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)
    
    setToken(user.accessToken)
    getWorkers()

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

  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
  };

  const [data, setData] = useState([])

  const getWorkers = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      setLoading(false) 
      const response = await fetch(`${baseUrl}protected/users?pageNo=${0}&pageSize=${10}&role=ROLE_WORKER`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.userResponseDTOList)
        console.log('WORKERS: ', responseData.userResponseDTOList);
      } else {
        // const errorResponse = await response.json();
        // throw new Error(errorResponse);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  const addWorker = async () => {
    setLoading(true)

    const data = {
      "email": formValues.email,
      "username": formValues.username,
      "role": "ROLE_WORKER",
      "password": formValues.password,
    }

    try {
      const response = await fetch(`${baseUrl}protected/users`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setLoading(false)
        setIsOpen(false)
        getWorkers()
        setMessage('Worker has been created')
        setSuccessSnack(true)

        setTimeout(() => {
          setSuccessSnack(false)
        }, 3000)
      } else {
        setLoading(false)
        setErrorText("An eeror occured")
        setErrorSnack(true)

        setTimeout(() => {
          setErrorSnack(false)
        }, 3000)
      }
    } catch (error) {
      setLoading(false)
      setErrorText(error.message)
      setErrorSnack(true)

      setTimeout(() => {
        setErrorSnack(false)
      }, 3000)
    }
  }

  const handleDelete = () => {

  }

  const handleUpdate = () => {

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
                    Add Worker
                  </button>
                </div>
                
                <div className="overflow-x-auto mt-16">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Usename
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date created
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-medium text-gray-900">{row.username}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{row.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {`${new Date(row.createdAt).toLocaleString()}`}
                                    </span>
                                </td>

                                <td className='mt-4'>
                                    <button
                                        className="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
                                        onClick={() => handleDelete(item.id)}>Delete</button>
                                    <button
                                        className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleUpdate(item.id)}>Suspend</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                { data.length == 0 &&
                  <p className='text-white text-center text-2xl mt-24'>No worker yet</p>
                }

            </div>
            
            <>
            {loading && <div>
                <LoadingSpinner />
            </div>}
            {showModal && <Modal>
              <div className="bg-white md:w-5/12 w-10/12 max-w-screen-md rounded-lg m-4 flex flex-col relative shadow-2xl p-4 items-center justify-center z-50">
                {!error && <p className=' text-center text-xl text-green-400'>{errorMessage}</p>}
                {error && <p className=' text-center text-xl text-red-400'>{errorMessage}</p>}
                <button onClick={() => setShowModal(false)} className='mt-6 bg-green-500 w-2/6 text-white text-center rounded-md'>close</button>
              </div>
            </Modal>}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto scrollbar-hide relative z-10">
            <div className="max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Add a Worker</h2>
              <form>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2 font-bold">
                  Username
                </label>
                <input
                  value={formValues.username}
                  name="username"
                  onChange={handleInputChange}
                  placeholder="Enter worker's username"
                  type="text" 
                  min="0"
                  onKeyDown="return event.keyCode !== 189"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 relative">
                  <label htmlFor="price" className="block mb-2 font-bold">
                    User email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      value={formValues.email}
                      name="email"
                      onChange={handleInputChange}
                      placeholder="Enter worker's email"
                      type="text"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                    />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="price" className="block mb-2 font-bold">
                    User password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      value={formValues.password}
                      name="password"
                      onChange={handleInputChange}
                      placeholder="Enter worker's password"
                      type="text"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                    />
                  </div>
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
                onClick={addWorker}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      {errorSnack && <ErrorSnackMessage message={errorText} />}
      {successSnack && <SnackMessage message={message} />}
    </>
    </div>
  </div>
    </div>
  );
};

export default Workers;
