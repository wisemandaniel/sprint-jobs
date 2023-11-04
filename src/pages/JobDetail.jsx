import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import { t } from 'i18next';
import { useNavigate, useParams } from 'react-router-dom';
import cameroon from '../data/cameroon.png'

const JobDetail = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  
  const { jobId } = useParams();
  const [job, setJob] = useState({})
  const [transactions, setTransactions] = useState([])
  const [isMakePayment, setIsMakePayment] = useState(false)
  const [showText, setShowText] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [timer, setTimer] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    getJobById()
    getJobTransactions()
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const getJobById = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      const response = await fetch(`${baseUrl}protected/jobs/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('JOB DETAIL: ', responseData);
        setJob(responseData)
      } else {
        
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  const getJobTransactions = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      // setLoading(false)
      const response = await fetch(`${baseUrl}protected/payments/job?jobId=${jobId}&transactionStatus=SUCCESSFUL`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        const sortedTransactions = [...responseData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTransactions(sortedTransactions)
        console.log('sortedTransactions: ', sortedTransactions);
        console.log('responseData: ', transactions);
      } else {
        
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  const [formValues, setFormValues] = useState({
    amount: '',
    phoneNumber: '',
    describe: 'First payment'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
  };

  function countdown(seconds) {
    if (seconds >= 0) {
      console.log(seconds);
      setTimer(seconds)
      setTimeout(() => {
        countdown(seconds - 1);
      }, 1000); // Call the function again after 1000 milliseconds (1 second)
    } else {
      setShowText(true)
      setLoading(false)
      setDone(true)
      console.log('Countdown has reached 0');
    }
  }

  const makePayment = async () => {    
    setLoading(true)
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    const data = {
      "amount": formValues.amount,
      "from": '237' + formValues.phoneNumber,
      "currency": 'XAF',
      "description": formValues.describe
    }

    try {
      const response = await fetch(`${baseUrl}protected/payments?jobId=${jobId}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const res = await response.json()
        console.log('response: ', res);
        setShowText(true)
        setDone(true)
        countdown(50)
      } else {
        setShowText(false)
        setLoading(false)
      }
    } catch (error) {
      setShowText(false)
      setLoading(false)
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
        <div className="container ml-auto mr-auto p-4 mt-16 w-5/6 sm:mt-2">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 flex flex-col justify-center">
                    <h2 className='text-center mb-8 text-2xl'>Job Detail</h2>
            <div className=' lg:flex'>
                <div className="lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
                    <div className="bg-gray-200 p-4 rounded-lg flex flex-row justify-between">
                    <p className="text-gray-600">Number of pages</p>
                    <p className="font-semibold text">{job.numbersOfPages}</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg mt-4 flex flex-row justify-between">
                    <p className="text-gray-600">Job Duration in days</p>
                    <p className="font-semibold text">{job.numberOfDays}</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg mt-4 flex flex-row justify-between">
                    <p className="text-gray-600">Created On</p>
                    <p className="font-semibold">{new Date(job.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    })}</p>
                    </div>
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
                    <div className="bg-gray-200 p-4 rounded-lg mb-4 flex flex-row justify-between">
                        <p className="text-gray-600">Total amount to be paid</p>
                        <p className="font-semibold">{job.amount} XAF</p>
                    </div>
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="bg-gray-200 p-4 rounded-lg flex flex-row justify-between mb-4">
                        <p className="text-gray-600">{transaction.description}</p>
                        <p className="font-semibold">{`${transaction.amount} XAF`}</p>
                        </div>
                    ))}
                    {transactions.length === 0 &&
                    <>
                        <div className="bg-gray-200 p-4 rounded-lg flex flex-row justify-between">
                            <p className="text-gray-600">First payment amount</p>
                            <p className="font-semibold">Not paid</p>
                        </div>
                        <div className="bg-gray-200 p-4 rounded-lg flex flex-row justify-between mt-4">
                            <p className="text-gray-600">Second payment amount</p>
                            <p className="font-semibold">Not paid</p>
                        </div>
                    </>
                    }
                </div>
            </div>
                <button onClick={() => setIsMakePayment(true)} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded ml-auto mr-auto w-4/6">
                    Make payment
                </button>
            </div>
        </div>
    </div>
  </div>

        {isMakePayment && <div className="fixed inset-0 flex items-center justify-center z-40 mt-16">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-4/6 mx-4 relative z-10">
            <div className="max-h-5/6 overflow-y-auto">
                <div className='flex flex-row justify-between border-b border-gray-300 mb-6'>
                    <h3 className='text-xl text-gray-600'>Pay for Job</h3>
                    <button 
                        className='mb-4 text-gray-500 font-bold text-xl'
                        onClick={() => setIsMakePayment(false)}
                    >
                        x
                    </button>
                </div>

              <div className="mb-8">
                <label htmlFor="firstName" className="block mb-2">
                  {t('description')}
                </label>
                <div className="relative flex items-center border rounded">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none bg-gray-200">
                        <p className='ml-2 mr-2'>Description</p>
                    </div>
                    <select
                        value={formValues.describe}
                        name="describe"
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-12 ml-16 text-xl"
                    >
                        <option value="First payment">First payment</option>
                        <option value="Second payment">Second payment</option>
                    </select>
                    </div>
                </div>
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2">
                  {t('amount')}
                </label>
              <div className="relative flex items-center border rounded">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none bg-gray-200">
                    <p className='ml-2 mr-2'>Amount</p>
                  </div>
                  <input
                    style={{letterSpacing: '4px'}}
                    value={formValues.amount}
                    name="amount"
                    onChange={handleInputChange}
                    placeholder="5000 XAF"
                    type="tel"
                    className="w-full px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-12 ml-12 text-xl"
                  />
                </div>
                </div>
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2">
                  {t('momo_number')}
                </label>
              <div className="relative flex items-center border rounded">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none bg-gray-200">
                  <img src={cameroon} alt="logo" className="w-3/6 h-3/6" ></img>
                    <p className='ml-2 mr-2'>237</p>
                  </div>
                  <input
                    style={{letterSpacing: '4px'}}
                    value={formValues.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputChange}
                    placeholder="6 7 8 X X X X X X"
                    type="tel"
                    className="w-full px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-12 ml-12 text-xl"
                  />
                </div>
                </div>
                
              {showText && <div className="mt-4">
                <label htmlFor="firstName" className="block text-center">
                  {t('dial_*126#')}
                </label>
                <div className='flex items-center justify-between w-4/6 ml-auto mr-auto'>
                    <span>{t('click_done')}</span> 
                    <span className='text-3xl text-green-500 text-center'>{timer}s</span>
                </div>
              </div>}
                {loading && 
                <div className='flex flex-row justify-between items-center'>
                    <p></p>
                    <div className="w-8 h-8 border-t-4 border-blue-500 border-solid animate-spin rounded-full"></div>
                    <p></p>
                </div>}
            {(!done && formValues.amount && formValues.phoneNumber && formValues.describe) && <div className="flex mt-1 items-center justify-center">
              <button
                type="button"
                onClick={makePayment}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow mt-2 w-full"
              >
                Make payment
              </button>
            </div>}
           {done && <div className="flex mt-4 items-center justify-center">
              <button
                type="button"
                onClick={() => {
                    navigate("/dashboard/uploadedJobs")
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow mt-2 w-full"
              >
                Done
              </button>
            </div>}
            </div>
          </div>
        </div>}
    </div>
  );
};

export default JobDetail;