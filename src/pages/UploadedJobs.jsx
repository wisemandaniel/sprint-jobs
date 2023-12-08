/* eslint-disable */
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
import SmallCard from '../components/Card/Card'
import { Grid } from '@mui/material';

const AploadedJobs = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate()

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
      const calculatedPrice = value * 150;
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
                  Add a job
                  </button>
                </div>

                <Grid style={{padding: '10px', marginLeft: 'auto', marginRight: 'auto', width: '95%', marginTop: '48px'}} container spacing={2}>
                  {loading ? (
                    <Grid item xs={12} textAlign="center">
                      {/* <CircularProgress /> */}
                    </Grid>
                  ) : (
                    data.map(item => (
                      <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                      <SmallCard
                          onClick={() => {
                            navigate(`/dashboard/Job/${item.id}`)
                          }} item={item} />
                      </Grid>
                    ))
                  )}
                </Grid>

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
                Number of pages you estimate
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
                Due date
                </label>
                <input
                  name="estimatedDuration"
                  onChange={handleInputChange}
                  placeholder={t('01/01/2024')}
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
                   Final work should be in
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
                Note
                </label>
                <textarea name="description"
                  onChange={handleInputChange}
                  type="text"
                  placeholder={'Please leave a brief Note explaining how you want your project done...'}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" rows="4" cols="50">

                </textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="block mb-2 font-bold">
                  Choose a file (image format)
                  or click on the WhatsApp Link below to send any other format.
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
              <div className="mb-4 flex flex-row justify-between w-5/6">
                <p>WhatsApp Link: </p>
                <a style={{color: 'blue', textDecoration: 'underline'}} href={'https://wa.link/ay9c70'}>https://wa.link/ay9c70</a>
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
