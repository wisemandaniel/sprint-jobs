import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Modal from '../components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

const Card = ({ item }) => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [transactions, setTransactions] = useState([])

  const openModal = async (item) => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      // setLoading(false)
      const response = await fetch(`${baseUrl}protected/payments/job?jobId=${item.id}`, {
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
        setSelectedItem(item);
      } else {
        setSelectedItem(null);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [id, setId] = useState('')
  const [showText, setShowText] = useState(false)

  const navigate = useNavigate()

  const openPaymentModal = () => {
    setId(id)
    setIsPaymentOpen(true)
  }

  const makePayment = async (id) => {
    // setLoading(true)
    
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    const data = {
      "amount": formValues.amount,
      "from": '237' + formValues.phoneNumber,
      "currency": 'XAF',
      "description": `Job payment for ${user.email}`
    }

    console.log('Data: ', data);

    try {
      // setLoading(false)
      const response = await fetch(`${baseUrl}protected/payments?jobId=${id}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const response2 = await response.json();
        console.log('Payment response: ', response2);
        // setErrorMessage('JOB created successfully!')
        // setShowModal(true)
        // setError(false)
        // setIsOpen(false)
      } else {
        // const errorResponse = await response.json();
        // throw new Error(errorResponse);
      }
    } catch (error) {
      // setError(true)
      // setLoading(false)
      console.log('error: ', error.message);
    }
  }


  const [formValues, setFormValues] = useState({
    amount: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
  };

  return (
    <div>
        <div style={{backgroundColor: '#fff'}}
                className="p-6 mt-5 rounded-lg shadow-lg mx-auto sm:w-3/6 m-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-400">{t('uploaded_on')} {item.createdAt.replace(/^(\d{4})-(\d{2})-(\d{2}).*/, '$3/$2/$1')}</h3>
            <p className="mb-4 text-gray-600">{item.description}</p>
            <div className="flex flex-col justify-between items-center sm:flex-row">
              <p className="text-green-400 font-extrabold"></p>
              <button onClick={() => {
                 navigate(`/dashboard/Job/${item.id}`)
              } } className="text-green-400 font-extrabold shadow-lg py-2 px-5 bg-green-100 rounded-md sm:mt-7">View more</button>
            </div>
        </div>
      
    

        {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative z-10">
            <div className="max-h-5/6 overflow-y-auto">
              <div className='flex flex-row justify-between'>
                <h3 className='text-2xl font-bold'></h3>
                <button 
                className='mb-4 text-2xl'
                onClick={closeModal}>x</button>
              </div>
              <div className='flex justify-between'>
                 <p className="text mb-6">Number of days: </p> 
                 <h2 className="text font-bold mb-6">{item.numberOfDays}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text mb-6">Number of pages: </p> 
                 <h2 className="text font-bold mb-6">{item.numbersOfPages}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text mb-6">Amount: </p> 
                 <h2 className="text font-bold mb-6 text-green-400">{item.amount} { item.currency}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text mb-6">Document type: </p> 
                 <h2 className="text font-bold mb-6">{item.documentType}</h2> 
              </div>
              <div className='flex justify-between'>
                 <p className="text mb-6">Status: </p> 
                 {item.jobTaken && <h2 className="text text-green-400 font-bold mb-6">Started</h2>}  
                 {!item.jobTaken && <h2 className="text text-red-400 font-bold mb-6">Not started</h2>} 
              </div>
              {(transactions.length > 0 && transactions.transactionStatus  === 'SUCCESS') &&<div className='flex justify-between'>
                 <p className="text mb-6">Amount paid: </p> 
                 {item.jobTaken && <h2 className="text text-green-400 font-bold mb-6">Started</h2>}  
                 {!item.jobTaken && <h2 className="text text-red-400 font-bold mb-6">{transactions.amount}</h2>} 
              </div>}
              {transactions === 0 &&<div className='flex justify-between'>
                 <p className="text mb-6">Payment status: </p> 
                 {item.jobTaken && <h2 className="text text-green-400 font-bold mb-6">Started</h2>}  
                 {!item.jobTaken && <h2 className="text text-red-400 font-bold mb-6">Not Paid</h2>} 
              </div>}
              {transactions.length > 0 && <div className='flex justify-between'>
                 <p className="text mb-6">Payment status: </p>
                 {(transactions[0].transactionStatus === 'FAILED') && <h2 className="text text-red-400 font-bold mb-6">{transactions[0].transactionStatus}</h2>}
                 {(transactions[0].transactionStatus === 'PENDING') && <h2 className="text text-orange-400 font-bold mb-6">{transactions[0].transactionStatus}</h2>}
              </div>}
              <div className="flex mt-4 items-center justify-center">
              <button
                type="button"
                onClick={() => openPaymentModal(item.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow mt-2 w-full"
              >
                Make payment
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

{isPaymentOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative z-10">
            <div className="max-h-5/6 overflow-y-auto">
              <div className='flex flex-row justify-between'>
                <h3 className='text-2xl font-bold'></h3>
                <button 
                className='mb-4 text-2xl'
                onClick={() => setIsPaymentOpen(false)}>x</button>
              </div>
              <div className="mb-12">
                <label htmlFor="firstName" className="block mb-2 font-bold">
                  {t('amount')}
                </label>
                <input
                  onChange={handleInputChange}
                  name="amount"
                  placeholder={t('Enter_amount_to_pay')}
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-600">
                    +237
                  </div>
                  <input
                    value={formValues.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputChange}
                    placeholder="Enter user's phone number"
                    type="tel"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-12"
                  />
                </div>
              {/* <div className="mb-12">
                <label htmlFor="firstName" className="block mb-2 font-bold">
                  {t('momo_number')}
                </label>
                <input
                  onChange={handleInputChange}
                  name="phoneNumber"
                  placeholder={t('enter_momo_number')}
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}
              {showText && <div className="mt-12">
                <label htmlFor="firstName" className="block mb-2 text-center">
                  {t('dial_*126#')}
                </label>
              </div>}
              {!showText && <div className="flex mt-16 items-center justify-center">
              <button
                type="button"
                onClick={() => makePayment(item.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow mt-2 w-full"
              >
                Make payment
              </button>
            </div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AploadedJobs = () => {
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
    getUploadedJobs()

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

  const postJob = (e) => {
    e.preventDefault();
    if (formValues.images.length > 0 && formValues.estimatedPrice && formValues.estimatedDuration && formValues.numberOfPages && formValues.documentType && formValues.description) {
      uploadImage(formValues.images);
    } else {
      const errorMessage = t('selectAllJobInfoError');
      setErrorMessage(errorMessage)
      setShowModal(true)
      setError(true)
    }
  }
  
  const [selectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      images: files,
    }));
  };

  const [formValues, setFormValues] = useState({
    numberOfPages: '',
    estimatedDuration: '',
    estimatedPrice: '',
    documentType: 'PDF',
    description: '',
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numberOfPages') {
      const calculatedPrice = value * 4;
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
        estimatedPrice: calculatedPrice,
      }));
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };

  const [data, setData] = useState([])

  const getUploadedJobs = async () => {
    setLoading(true)
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/jobs/created`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.jobResponseDTOList)
      } else {
        
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  const uploadJobInfo = async (imageId) => {
    setLoading(true)

    const data = {
      "amount": parseInt(formValues.estimatedPrice),
      "currency": "XAF",
      "description": formValues.description,
      "documentType": formValues.documentType,
      "imagesId": imageId,
      "numberOfDays": parseInt(formValues.estimatedDuration),
      "numbersOfPages": parseInt(formValues.numberOfPages),
      "title": "string"
    }

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/jobs`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        getUploadedJobs()
        setErrorMessage('JOB created successfully!')
        setLoading(false)
        setError(false)
        setIsOpen(false)
      } else {
        
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      console.log('error: ', error.message);
    }
  }

  const uploadImage = async (files) => {
    setLoading(true)
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/jobs/files/uploadJob`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });

      if (response.ok) {
        setLoading(false)
        console.error('Image upload success.');
        const responseData = await response.json();
        uploadJobInfo(responseData.id)
      } else {
        
      }
    } catch (error) {
      setError(true)
      setLoading(false)
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

                <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                  <div></div>
                  <button onClick={openModal} style={{backgroundColor: currentColor}} className='py-2 px-5 rounded-md text-white'>
                    {t('Add_a_job')}
                  </button>
                </div>

                {data.map((card, index) => (
                  <Card item={card} />
                ))}

                { data.length == 0 &&
                  <p className='text-white text-center text-2xl mt-24'>{t('No_job_yet')}</p>
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
              <h2 className="text-2xl font-bold mb-6">{t('Add_a_job')}</h2>
              <form>
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2 font-bold">
                  {t('Number_of_pages')}
                </label>
                <input
                  onChange={handleInputChange}
                  name="numberOfPages"
                  placeholder={t('Enter_total_number_of_estimated_pages')}
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2 font-bold">
                  {t('Estimated_Duration')}
                </label>
                <input
                  name="estimatedDuration"
                  onChange={handleInputChange}
                  placeholder={t('Enter_total_number_of_estimated_days')}
                  type="number" 
                  min="0"
                  onKeyDown="return event.keyCode !== 189"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 relative">
                  <label htmlFor="price" className="block mb-2 font-bold">
                    {t('Estimated_Price')}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      value={formValues.estimatedPrice}
                      disabled
                      name="estimatedPrice"
                      onChange={handleInputChange}
                      placeholder={t('Calculated_from_total_number_of_pages')}
                      type="text"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                    />
                    <span className="absolute right-3 text-gray-500">XAF</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="documentType" className="block mb-2 font-bold">
                    {t('Document_Type')}
                  </label>
                  <select
                    name="documentType"
                    onChange={handleInputChange}
                    id="documentType"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="EXCEL">EXCEL</option>
                    <option value="POWERPOINT">POWERPOINT</option>
                  </select>
                </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2 font-bold">
                  {t('Description')}
                </label>
                <input
                  name="description"
                  onChange={handleInputChange}
                  type="text"
                  placeholder={t('Enter_brief_description_of_what_you_want')}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="block mb-2 font-bold">
                  Images
                </label>
                <input
                  name="images"
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleImageChange}
                />
              </div>
            </form>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                {t('Cancel')}
              </button>
              <button
                type="submit"
                onClick={postJob}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                {t('upload')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    {loading && <div>
      <LoadingSpinner />
    </div>}
    </div>
  </div>
    </div>
  );
};

export default AploadedJobs;
