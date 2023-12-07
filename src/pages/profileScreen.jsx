/* eslint-disable */
import React, { useState, useEffect } from 'react';

import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import SnackMessage from '../components/SnackBar/Snackbar';


const ProfileScreen = () => {
  const [showSnack, setShowSnack] = useState(false);

  const [updateValues, setUpdateValues] = useState({
    phoneNumber: '',
    username: '',
  });

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
      setUpdateValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
  };

  const updateProfile = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)
    setLoading(true)

    const data = {
      "phoneNumber": '237' + updateValues.phoneNumber,
      "username": updateValues.username
    }

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/user/profile`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        getUserProfile()
        setIsOpen(false)
        setShowSnack(true)

        // Set a timeout to reset showSnack to false after 3 seconds
        setTimeout(() => {
          setShowSnack(false);
        }, 3000);
      } else {
        // const errorResponse = await response.json();
        // throw new Error(errorResponse);
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      console.log('error: ', error.message);
    }
  }


  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  
  const [languageModal, setLanguageModal] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };

  const openModalWallet = () => {
    setIsOpenWallet(true);
  };

  useEffect(() => {
    getAllUserTransactions()
    getUserProfile()
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);  

  const [userdta, setUser] = useState({})

  const getUserProfile = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData)
        console.log('PROFILE: ', responseData);
      } else {
        // const errorResponse = await response.json();
        // throw new Error(errorResponse);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
  
  const [formValues, setFormValues] = useState({
    phone: '',
    username: '',
  });

  const changeLanguage = () => {
    setLanguageModal(true)
  };

  const getAllUserTransactions = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      // setLoading(false)
      const response = await fetch(`${baseUrl}protected/payments/user`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setTransactions(responseData.paymentResponseDTOList)
      } else {
        
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  const [transactions, setTransactions] = useState([])

  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen2, setIsOpen2] = useState(false);
  const options = [
    {
      code: 'en',
      language: 'English'
    },
    {
      code: 'fr',
      language: 'French'
    }
  ]

  const toggleDropdown = () => {
    setIsOpen2(!isOpen2);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen2(false);
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
            <div className="w-4/5 m-auto mt-16 flex items-center justify-center">
                {/* Goes here */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-blue-500 px-6 py-4">
                        <h2 className="text-white text-2xl text-center font-bold">User Profile</h2>
                    </div>

                    {/* User Information */}
                    <div className="p-6">
                        <div className="flex justify-between sm:flex-row flex-col">
                        <div>

                            <div className='mt-8'>
                                <p className="text-gray-500">Username</p>
                                <h3 className="text-2xl text-gray-500 font-bold">{userdta.username}</h3>
                            </div>

                            
                            {/* <div className='mt-8'>
                                <p className="text-gray-500">Role</p>
                                {userdta.roleDTOList[0].name === 'ROLE_USER' && <h3 className="text-gray-500 font-bold">USER</h3>}
                                {userdta.roleDTOList[0].name === 'ROLE_WORKER' && <h3 className="text-gray-500 font-bold">WORKER</h3>}
                                {userdta.roleDTOList[0].name === 'ROLE_ADMIN' && <h3 className="text-gray-500 font-bold">ADMINISTRATOR</h3>}
                            </div> */}
                            <div className='mt-8'>
                                <p className="text-gray-500">Momo number</p>
                                <h3 className="text-gray-500 font-bold">{userdta.phoneNumber}</h3>
                            </div>
                            
                            <div className='mt-8'>
                                <p className="text-gray-500">Email</p>
                                <h3 className="text-gray-500 font-bold">{userdta.email}</h3>
                            </div>

                            <div className='mt-8'>
                                <button onClick={openModal} className='ml-auto mr-auto bg-green-600 px-4 py-1 rounded text-white font-bold'>
                                Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <div className='mt-8'>
                              <button onClick={openModalWallet} className='ml-auto mr-auto bg-green-600 px-4 py-1 rounded text-white font-bold'>All transactions</button>
                            </div>
                            <div className='mt-8'>
                            <button
                                type="button"
                                className="w-full bg-green-600 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onClick={toggleDropdown}
                              >
                              <span className='text-white font-bold'>{selectedOption || 'Select an option'}</span>
                              <svg
                                className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                                  isOpen ? 'transform rotate-180' : ''
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.293 6.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                             </button>
                            </div>
                        </div>
                        {isOpen2 && (
                          <div className="fixed inset-0 flex items-center justify-center z-40">
                          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
                          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto scrollbar-hide relative z-10 h-2/6">
                          <div>
                            <h2 className="text-2xl font-bold mb-2 text-center">Select language</h2>
                          </div>
                            <div className="container mx-auto py-8">
                                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4 flex justify-center">
                                  <ul className="absolute z-10 bg-white border border-gray-300 dark:border-gray-700 rounded-md mt-1 shadow-sm  w-5/6">
                                            {options.map((option) => (
                                              <li
                                                key={option.code}
                                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900
                                                hover:text-white"
                                                onClick={() => selectOption(option.language)}
                                              >
                                                {option.language}
                                              </li>
                                            ))}
                                          </ul>
                                  </div>
                            </div>
                          </div>
                        </div>
                        )}
                        </div>
                    </div>
                    </div>
                </div>    
            </div>
          </div>
        </div>

        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto scrollbar-hide relative z-10">
            <div className="max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Update profile</h2>
              <form>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2 font-bold">
                  Username
                </label>
                <input
                  value={updateValues.username}
                  name="username"
                  onChange={handleUpdateInputChange}
                  placeholder="Enter User's username"
                  type="text" 
                  min="0"
                  onKeyDown="return event.keyCode !== 189"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 relative">
                  <label htmlFor="price" className="block mb-2 font-bold">
                    User phone
                  </label>
                  <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-600">
                    +237
                  </div>
                  <input
                    value={updateValues.phoneNumber}
                    name="phoneNumber"
                    onChange={handleUpdateInputChange}
                    placeholder="Enter user's phone number"
                    type="tel"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-12"
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
                onClick={updateProfile}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                Update
              </button>
            </div>
          </div>
        </div>
        )}

        {isOpenWallet && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto scrollbar-hide relative z-10">
          <div className='flex flex-row justify-between'>
            <h2 className="text-2xl font-bold mb-2 text-center">All transactions</h2>
            <button onClick={() => setIsOpenWallet(false)} className="text-2xl mb-2 text-center">X</button>
          </div>
          <div className="overflow-y-auto h-3/4 max-h-96">
            <div className="container mx-auto py-8">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4">
                  <div className="px-6 py-4">
                    <div className="mb-4 flex flex-row justify-between">
                      <label className="block text-gray-600 text-sm font-semibold mb-2">Amount</label>
                      <p className="text-green-500 font-medium">{transaction.amount.toFixed(2)} FCFA</p>
                    </div>
                    <div className="mb-4 flex flex-row justify-between">
                      <label className="block text-gray-600 text-sm font-semibold mb-2">Date</label>
                      <p className="text-gray-800 font-medium">
                        {new Date(transaction.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="mb-4 flex flex-row justify-between">
                      <label className="block text-gray-600 text-sm font-semibold mb-2">Time</label>
                      <p className="text-gray-800 font-medium">
                        {new Date(transaction.createdAt).toLocaleString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="mb-4 flex flex-row justify-between">
                      <label className="block text-gray-600 text-sm font-semibold mb-2">Status</label>
                      <p className={transaction.transactionStatus === 'SUCCESSFUL' ? 'text-green-500' : transaction.transactionStatus === 'PENDING' ? 'text-yellow-500' : 'text-red-500'}>{transaction.transactionStatus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {transactions.length === 0 && <div>
              <h3 className='text-center'>No transactions yet</h3>
            </div>}
          </div>
        </div>
    
        </div>
        )}

        {showSnack && <SnackMessage message="Profile updated successfully" />}
    </div>
  );
};

export default ProfileScreen;

