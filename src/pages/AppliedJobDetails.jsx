/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import { t } from 'i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorSnackMessage from '../components/ErrorSnackbar/ErrorSnackbar';
import SnackMessage from '../components/SnackBar/Snackbar'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const AppliedJobDetail = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  
  const { jobId } = useParams();
  const [job, setJob] = useState({})
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSnack, setShowSnack] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccessSnack, setShowSuccessSnack] = useState(false)
  const [sucessMessage, setSucessMessage] = useState('')
  const [progress, setProgress] = useState('STARTED');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getJobById()
    getJobTransactions()
    getJobStatus()
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
  
  const handleSubmit = async () => {
    setLoading(true)
    const url = `${baseUrl}protected/jobs/completeJob`;
    
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('files', document.querySelector('input[type="file"]').files[0]);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setLoading(false)
        setProgress('COMPLETED');
        setIsOpen(false)
        setSucessMessage("Congratulations! You just completed and submitted this job")
        setShowSuccessSnack(true)        
        setTimeout(() => {
            setShowSuccessSnack(false);
        }, 3000);
      } else {
        setLoading(false)
        setErrorMessage('An error occured uploading file')
        setShowSnack(true)        
        setTimeout(() => {
            setShowSnack(false);
        }, 3000);
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
    }
  }

  const updateProgress = async () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    const url = baseUrl + `protected/jobs/status?jobId=${jobId}`

    if (progress === 'STARTED') {

      try {
        setLoading(true)
        const response = await fetch(url + '&status=IN_PROGRESS', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.accessToken
          }
        });
  
        if (response.ok) {
          setProgress('IN PROGRESS');
          setShowSnack(false)
          setLoading(false)
          setSucessMessage("Job status has been updated")
          setShowSuccessSnack(true)
          // Set a timeout to reset showSnack to false after 3 seconds
          setTimeout(() => {
            setShowSuccessSnack(false);
          }, 3000);
        } else {
            setLoading(false)
            setErrorMessage("An error occured")
            setShowSnack(true)        
            setTimeout(() => {
                setShowSnack(false);
            }, 3000);
        }
      } catch (error) {
        setLoading(false)
      }

    } else if (progress === 'IN PROGRESS') {
        setLoading(false)
        setIsOpen(true)
    } else if (progress === 'COMPLETED') {
        setLoading(false)
        setSucessMessage("You already completed this job")
        setShowSuccessSnack(true)       
        setTimeout(() => {
            setShowSuccessSnack(false);
        }, 3000);
    }
  };

  const closeModal = () => {
    setIsOpen(false)
    setProgress('IN PROGRESS')
  }

  const getJobStatus = async () => {
    setLoading(true)
    const url = baseUrl + `protected/jobs/status?jobId=${jobId}`

    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setLoading(false)
        const responseData = await response.json();
        console.log('JOB STATUS: ', responseData);

        if (responseData.jobStatus === 'STARTED') {
            setProgress('STARTED')
        } else if (responseData.jobStatus === 'IN_PROGRESS') {
            setProgress('IN PROGRESS')
        } else if (responseData.jobStatus === 'COMPLETED') {
            setProgress('COMPLETED')
        }
      } else {
        setLoading(false)
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
                    <p className="text-gray-600">Job Status</p>
                    {progress === 'STARTED' && <p className="text-lg font-semibold text-green-400">{progress} </p>}
                    {progress === 'IN PROGRESS' && <p className="text-lg font-semibold text-green-500">{progress} </p>}
                    {progress === 'COMPLETED' && <p className="text-lg font-bold text-green-600">{progress} </p>}
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
                <button onClick={updateProgress} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded ml-auto mr-auto w-4/6">
                    Update job status
                </button>
            </div>
        </div>

        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-y-auto scrollbar-hide relative z-10">
            <div className="max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-8">Upload a job file</h2>
              <form>
              <div className="mb-4">
                <input
                  name="documents"
                  type="file"
                  id="documents"
                  accept=".doc, .docx, .pdf, .ppt, .pptx, .xls, .xlsx"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </form>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                {t('Cancel')}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                {'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
        {showSnack && <ErrorSnackMessage message={errorMessage} />}
        {showSuccessSnack && <SnackMessage message={sucessMessage} />}
        {loading && <LoadingSpinner />}
    </div>
  );
};

export default AppliedJobDetail;