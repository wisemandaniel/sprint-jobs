import React, { useState, useEffect } from 'react';

import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';


const ProfileScreen = () => {
    const [balance, setBalance] = useState(500);
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    if (amount && Number(amount) <= balance) {
      setBalance(balance - Number(amount));
      setAmount('');
    }
  };

  const handleFund = () => {
    if (amount) {
      setBalance(balance + Number(amount));
      setAmount('');
    }
  };


  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  };

  const openModalWallet = () => {
    setIsOpenWallet(true);
  };

  useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
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

                            
                            <div className='mt-8'>
                                <p className="text-gray-500">Role</p>
                                {userdta.roleDTOList[0].name === 'ROLE_USER' && <h3 className="text-gray-500 font-bold">USER</h3>}
                                {userdta.roleDTOList[0].name === 'ROLE_WORKER' && <h3 className="text-gray-500 font-bold">WORKER</h3>}
                                {userdta.roleDTOList[0].name === 'ROLE_ADMIN' && <h3 className="text-gray-500 font-bold">ADMINISTRATOR</h3>}
                            </div>
                            
                            <div className='mt-8'>
                                <p className="text-gray-500">Email</p>
                                <h3 className="text-gray-500 font-bold">{userdta.email}</h3>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <p className="text-gray-500 sm:text-center">Wallet</p>
                            <h3 className="text-2xl font-bold mt-2 text-green-400 mb-4">70000 XAF</h3>
                            <button onClick={openModalWallet} className='ml-auto mr-auto bg-green-600 px-4 py-1 rounded text-white font-bold'>view wallet</button>

                            <div className='mt-12'>
                                <button onClick={openModal} className="text-white font-semibold px-4 py-2 rounded bg-blue-700 hover:bg-blue-800">
                                Edit Profile
                                </button>
                            </div>
                        </div>
                        
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
                    <input
                      value={formValues.phone}
                      name="phone"
                      onChange={handleInputChange}
                      placeholder="Enter user's phone number"
                      type="phone"
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
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
        )}

        {isOpenWallet && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto scrollbar-hide relative z-10">
            
            <h1 className="text-3xl font-bold mb-8 text-center">Wallet</h1>
            <div className="bg-white shadow-md rounded-md p-6 w-full max-w-lg">
                <div className="flex items-center mb-4">
                <span className="text-gray-600 text-lg mr-2">Balance:</span>
                <span className="text-blue-600 text-2xl font-bold">{balance} FCFA</span>
                </div>
                <div className="flex flex-col">
                <input
                    type="number"
                    className="flex-1 appearance-none rounded-md border border-gray-300 py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8"
                    onClick={handleWithdraw}
                >
                    Withdraw
                </button>
                <button
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-8"
                    onClick={handleFund}
                >
                    Fund
                </button>
                </div>
            </div>

              <button
                type="button"
                onClick={() => setIsOpenWallet(false)}
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow mt-8"
              >
                Cancel
              </button>
          </div>
        </div>
        )}
    </div>
  );
};

export default ProfileScreen;
