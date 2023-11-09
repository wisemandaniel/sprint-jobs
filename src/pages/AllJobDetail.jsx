import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import { t } from 'i18next';
import { useNavigate, useParams } from 'react-router-dom';
import SnackMessage from '../components/SnackBar/Snackbar';
import ErrorSnackMessage from '../components/ErrorSnackbar/ErrorSnackbar';
// An array of image URLs
const imageUrls = [
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww',
  ];


const AllJobDetail = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  
  const { jobId } = useParams();
  const [job, setJob] = useState({})
  const [transactions, setTransactions] = useState([])
  const [isMakePayment, setIsMakePayment] = useState(false)
  const [isImages, setIsImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccessSnack, setShowSuccessSnack] = useState(false)
  const [showErrorSnack, setShowErrorSnack] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

  const startJob = async () => {

    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    setLoading(true)

    const data = {
      "jobId": jobId,
    }

    if (transactions.length === 0) {
        setIsMakePayment(true)
    } 
    else {
        try {
            setLoading(false)
            const response = await fetch(`${baseUrl}protected/jobs/start?jobId=${jobId}`, {
              method: 'PUT',
              headers: {
                'Authorization': 'Bearer ' + user.accessToken,
                'Content-Type': 'application/json'
              },
            });
      
            if (response.ok) {
              setShowSuccessSnack(true)
              setMessage('Successfully have confirmed to start this job')
            } else {
              setShowErrorSnack(true)
              setErrorMessage('An error occured')
            }
          } catch (error) {
            setShowErrorSnack(true)
            setErrorMessage(error)
          }
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
                    <div className="bg-gray-200 p-4 rounded-lg mt-4 flex flex-row justify-between">
                    <p className="text-gray-600">Document type</p>
                    <p className="font-semibold">{job.documentType}</p>
                    </div>
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
                    <div className="bg-gray-200 p-4 rounded-lg mb-4 flex flex-row justify-between">
                        <p className="text-gray-600">Total amount to be paid</p>
                        <p className="font-semibold text-green-600">{job.amount} XAF</p>
                    </div>
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="bg-gray-200 p-4 rounded-lg flex flex-row justify-between mb-4">
                        <p className="text-gray-600">{transaction.description}</p>
                        <p className="font-semibold text-green-600">{`${transaction.amount} XAF`}</p>
                        </div>
                    ))}
                    {transactions.length === 0 &&
                    <>
                        <div className="bg-gray-200 p-4 rounded-lg flex flex-row justify-between">
                            <p className="text-gray-600">First payment amount</p>
                            <p className="font-semibold text-red-300">Not paid</p>
                        </div>
                        <div className="bg-gray-200 p-4 rounded-lg flex flex-row justify-between mt-4">
                            <p className="text-gray-600">Second payment amount</p>
                            <p className="font-semibold text-red-300">Not paid</p>
                        </div>
                    </>
                    }
                </div>
            </div>
                <button onClick={() => {
                    navigate(`/dashboard/JobImages/${jobId}`)
                }} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded ml-auto mr-auto w-4/6">
                    View all images for this job
                </button>
                <button onClick={startJob} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded ml-auto mr-auto w-4/6">
                    Start Job
                </button>
            </div>
        </div>
    </div>
  </div>

        {isMakePayment && <div className="fixed inset-0 flex items-center justify-center z-40 mt-16">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-4/6 mx-4 relative z-10">
            <div className="flex flex-row justify-between mb-2">
                <p></p>
                <button onClick={() => setIsMakePayment(false)} className='text-center text-gray-600 font-semibold text-xl'>x</button>
            </div>
            <div className="">
                <p className='text-center'>User has not paid for this job yet</p>
            </div>
          </div>
        </div>}

        {isImages && <div className="fixed inset-0 flex items-center justify-center z-40 mt-16">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-4/6 mx-4 relative z-10">
            <div className="flex flex-row justify-between mb-2">
                <p></p>
                <button onClick={() => setIsImages(false)} className='text-center text-gray-600 font-semibold text-xl'>x</button>
            </div>
            <div className="">
                <p className='text-center'>User has not uploaded images for this job yet</p>
            </div>
          </div>
        </div>}
        {showSuccessSnack && <SnackMessage message={message} />}
        {showErrorSnack && <ErrorSnackMessage message={errorMessage} />}
    </div>
  );
};

export default AllJobDetail;