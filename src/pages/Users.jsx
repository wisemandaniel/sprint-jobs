import React, { useState, useEffect } from 'react';

import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Modal from '../components/Modal/Modal';

const Card = ({ item }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
        <div style={{backgroundColor: '#fff'}}
                className="p-6 mt-5 rounded-lg shadow-lg mx-auto w-3/6 m-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-400">uploaded on {item.createdAt.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1')}</h3>
            <p className="mb-4 text-gray-600">{item.description}</p>
            <div className="flex flex-col justify-between items-center sm:flex-row">
              <p className="text-green-400 font-extrabold"></p>
              <button onClick={() => openModal(item)} className="text-green-400 font-extrabold shadow-lg py-2 px-5 bg-green-100 rounded-md sm:mt-7">View more</button>
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
              <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                Cancel
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Users = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)
    
    setToken(user.accessToken)
    getUsers()

    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {

  }

  const handleUpdate = () => {

  }

  const [data, setData] = useState([])

  const getUsers = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      setLoading(false) 
      const response = await fetch(`${baseUrl}protected/users?pageNo=${0}&pageSize=${10}&role=ROLE_USER`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.userResponseDTOList)
        console.log('Users: ', responseData.userResponseDTOList);
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
            <div className="w-4/5 m-auto mt-20">
                
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

                                <td>
                                    <button
                                        className="bg-red-400 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
                                        onClick={() => handleDelete(item.id)}>Delete</button>
                                    <button
                                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleUpdate(item.id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                { data.length == 0 &&
                  <p className='text-white text-center text-2xl mt-24'>No job yet</p>
                }

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

export default Users;
