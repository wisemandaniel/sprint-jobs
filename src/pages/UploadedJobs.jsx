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

const Modal2 = ({ item, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Uploaded on {item.createdAt}</h3>
        <p>{item.description}</p>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

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
    console.log('IMAGES: ', formValues.images);
    if (formValues.images.length > 0 && formValues.estimatedPrice && formValues.estimatedDuration && formValues.numberOfPages && formValues.documentType && formValues.description) {
      uploadImage(formValues.images);
    } else {
      setErrorMessage('Please select images and fill all information')
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
      const calculatedPrice = value * 10;
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
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/jobs/created?pageNo=${0}&pageSize=${10}&taken=false`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.jobResponseDTOList)
        console.log('JOBS: ', responseData.jobResponseDTOList);
      } else {
        // const errorResponse = await response.json();
        // throw new Error(errorResponse);
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
        setErrorMessage('JOB created successfully!')
        // setShowModal(true)
        setError(false)
        setIsOpen(false)
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

  const uploadImage = async (files) => {
    setLoading(true)
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/files/uploadJob`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });

      if (response.ok) {
        console.error('Image upload success.');
        const responseData = await response.json();
        uploadJobInfo(responseData.id)
      } else {
        console.error('Image upload failed.');
      }
    } catch (error) {
      setError(true)
      setLoading(false)
      console.error('Error occurred during image upload:', error);
    }
  }

  const cardsData = [
    { title: 'Card 1', description: 'Description for Card 1' },
    { title: 'Card 2', description: 'Description for Card 2' },
    { title: 'Card 3', description: 'Description for Card 3' }
  ];

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

                {data.map((card, index) => (
                  <Card item={card} />
                ))}

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
              <h2 className="text-2xl font-bold mb-6">Add Job</h2>
              <form>
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2 font-bold">
                  Number of pages
                </label>
                <input
                  onChange={handleInputChange}
                  name="numberOfPages"
                  placeholder='Enter total number of estimated pages'
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2 font-bold">
                  Estimated Duration
                </label>
                <input
                  name="estimatedDuration"
                  onChange={handleInputChange}
                  placeholder='Enter total number of estimated days'
                  type="number" 
                  min="0"
                  onKeyDown="return event.keyCode !== 189"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4 relative">
                  <label htmlFor="price" className="block mb-2 font-bold">
                    Estimated Price
                  </label>
                  <div className="relative flex items-center">
                    <input
                      value={formValues.estimatedPrice}
                      disabled
                      name="estimatedPrice"
                      onChange={handleInputChange}
                      placeholder='Calculated from total number of pages'
                      type="text"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                    />
                    <span className="absolute right-3 text-gray-500">XAF</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="documentType" className="block mb-2 font-bold">
                    Document Type
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
                  Description
                </label>
                <input
                  name="description"
                  onChange={handleInputChange}
                  type="text"
                  placeholder='Enter brief description of what you want'
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
                Cancel
              </button>
              <button
                type="submit"
                onClick={postJob}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
    </div>
  </div>
    </div>
  );
};

export default AploadedJobs;
