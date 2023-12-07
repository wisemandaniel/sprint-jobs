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
import cameroon from '../data/cameroon.png'
import ErrorSnackMessage from '../components/ErrorSnackbar/ErrorSnackbar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JobDetail = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  
  const { jobId } = useParams();
  const [job, setJob] = useState({})
  const [transactions, setTransactions] = useState([])
  const [paidAmt, setPaidAmt] = useState('')
  const [isMakePayment, setIsMakePayment] = useState(false)
  const [showText, setShowText] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [timer, setTimer] = useState('')
  const [showSnack, setShowSnack] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [progress, setProgress] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    getJobById()
    getJobStatus()
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
        

        if (sortedTransactions.length > 0) {
          const totalAmount = sortedTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
          console.log(totalAmount);
          setPaidAmt(totalAmount)
        }
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
      setTimer(seconds)
      setTimeout(() => {
        countdown(seconds - 1);
      }, 1000); // Call the function again after 1000 milliseconds (1 second)
    } else {
      getJobTransactions()
      setShowText(true)
      setLoading(false)
      setDone(true)
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

    if (transactions.length === 0 && formValues.amount < job.amount / 2) {
      setErrorMessage(`Amount must be greater than or equal to ${job.amount / 2} FCFA`)
      setLoading(false)
      setShowSnack(true)
    
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);

    } else if (formValues.phoneNumber.length < 9) {
      setErrorMessage(`Phone number must be 9 digits`)
      setLoading(false)
      setShowSnack(true)
    
      setTimeout(() => {
        setShowSnack(false);
      }, 3000);
      
    } else {
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
          countdown(60)
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

  const downloadFile = async () => {
    if (transactions.length > 0) {
      const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      console.log(totalAmount);
      setPaidAmt(totalAmount)
      
      if (totalAmount === job.amount) {
        setLoading(true)
         const url = `${baseUrl}protected/jobs/completed/files?jobId=${jobId}`
         
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
            console.log('JOB FILE: ', responseData);

            handleDownload(responseData[0].url, responseData[0].name)
            // setFileUrl(responseData[0].url)
          } else {
            setLoading(false)
          }
        } catch (error) {
          console.log('error: ', error.message);
        }

      } else {
        setErrorMessage("Please complete payment to download file")
        setShowSnack(true)

        setTimeout(() => {
          setShowSnack(false)
        }, 3000);
      }
    }
  }

  const [showSuccessSnack, setShowSuccessSnack] = useState(false)
  const [message, setMessage] = useState('')

  const handleDownload = (url, name) => {
    setLoading(true)
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMessage('File downloaded successfully')
        setShowSuccessSnack(true)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setErrorMessage(`Error downloading file: , ${error}`)
        setShowSnack(true)
      });
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
        <div className="container ml-auto mr-auto p-4 mt-16 w-5/6 sm:mt-2">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 flex flex-col justify-center">
                    <h2 className='text-center mb-8 text-2xl'>Job Detail</h2>
            <div className=' lg:flex'>
                <div className="lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
                    <div className="bg-gray-200 p-4 rounded-lg flex flex-col sm:justify-between sm:flex-row justify-center items-center">
                    <p className="text-gray-600">Number of pages</p>
                    <p className="font-semibold text">{job.numbersOfPages}</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg mt-4 flex flex-col sm:justify-between sm:flex-row justify-center items-center">
                    <p className="text-gray-600">Job Duration in days</p>
                    <p className="font-semibold text">{job.numberOfDays}</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg mt-4 flex flex-col sm:justify-between sm:flex-row justify-center items-center">
                    <p className="text-gray-600">Created On</p>
                    <p className="font-semibold">{new Date(job.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    })}</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg mt-4 flex flex-col sm:justify-between sm:flex-row justify-center items-center">
                    <p className="text-gray-600">Job Status</p>
                    {progress === 'STARTED' && <p className="text-lg font-semibold text-green-400">{progress} </p>}
                    {progress === 'IN PROGRESS' && <p className="text-lg font-semibold text-green-500">{progress} </p>}
                    {progress === 'COMPLETED' && <p className="text-lg font-bold text-green-600">{progress} </p>}
                    {(progress !== 'STARTED' && progress !== 'IN PROGRESS' && progress !== 'COMPLETED') && (
                      <p className="text-lg font-bold text-red-400">NOT STARTED</p>
                    )}

                    </div>
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0 lg:ml-6">
                    <div className="bg-gray-200 p-4 rounded-lg mb-4 flex flex-col sm:justify-between sm:flex-row justify-center items-center">
                        <p className="text-gray-600">Total amount</p>
                        <p className="font-semibold text-green-600">{job.amount} XAF</p>
                    </div>
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="bg-gray-200 p-4 rounded-lg flex flex-col sm:justify-between sm:flex-row justify-center items-center mb-4">
                        <p className="text-gray-600">{transaction.description}</p>
                        <p className="font-semibold text-green-600">{`${transaction.amount} XAF`}</p>
                        </div>
                    ))}
                    {transactions.length === 0 &&
                    <>
                        <div className="bg-gray-200 p-4 rounded-lg flex flex-col sm:justify-between sm:flex-row justify-center items-center">
                            <p className="text-gray-600">First payment</p>
                            <p className="font-semibold text-red-300">Not paid</p>
                        </div>
                        <div className="bg-gray-200 p-4 rounded-lg flex flex-col sm:justify-between sm:flex-row justify-center items-center mt-4">
                            <p className="text-gray-600">Second payment</p>
                            <p className="font-semibold text-red-300">Not paid</p>
                        </div>
                    </>
                    }
                </div>
            </div>
              {/* {(parseInt(paidAmt) < parseInt(job.amount)) && ( */}
                <button
                  onClick={() => setIsMakePayment(true)}
                  className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded ml-auto mr-auto sm:w-4/6 w-full"
                >
                  Make payment
                </button>
              {/* )} */}

                {progress === 'COMPLETED' && <button onClick={downloadFile} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded ml-auto mr-auto w-4/6">
                    Download file
                </button>}
            </div>
       {loading && <LoadingSpinner />}
        {showSnack && 
            <Snackbar
            open={showModal}
            autoHideDuration={5000}
            onClose={() => setShowModal(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setShowModal(false)}
              severity="error"
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        }
        {showSuccessSnack && 
            <div style={{marginTop: '8px'}}>
              <Snackbar
                open={showSuccessSnack}
                autoHideDuration={3000}
                onClose={() => setShowSuccessSnack(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  onClose={() => setShowSuccessSnack(false)}
                  severity="success"
                >
                  {message}
                </Alert>
              </Snackbar>
            </div>
        }
        </div>
    </div>
  </div>

        {isMakePayment && <div className="fixed inset-0 flex items-center justify-center z-40 mt-16">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md sm:w-4/6 m-4 relative z-10 w-full">
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
                        <p className='ml-2 mr-2'>Type</p>
                    </div>
                    <select
                        value={formValues.describe}
                        name="describe"
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-12 ml-6 text-xl"
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