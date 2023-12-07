/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, ThemeSettings } from '../components';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import baseUrl from './url';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JobImages = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  
  const { jobId } = useParams();
  const [imageUrls, setImageUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showSnack, setShowSnack] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccessSnack, setShowSuccessSnack] = useState(false)
  const [message, setMessage] = useState('')

  const openLightbox = (index) => {
    setIsOpen(true);
    setPhotoIndex(index);
  };

  useEffect(() => {
    getImages()
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const getImages = async () => {
    setLoading(true)
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)

    try {
      setLoading(false)
      const response = await fetch(`${baseUrl}protected/jobs/files?jobId=${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.accessToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Images: ', responseData);
        setImageUrls(responseData)
      } else {
        
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {imageUrls.map((imageUrl, index) => (
                    <div key={index} className="relative group" onClick={() => handleDownload(imageUrl.url, imageUrl.name)}>
                    <img
                        src={imageUrl.url}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                    </div>
                ))}
            </div>
            <div className=' lg:flex'>
            </div>
            </div>
        </div>
    </div>
  </div>
   {loading && <div>
    <LoadingSpinner />
   </div>}
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
  );
};

export default JobImages;