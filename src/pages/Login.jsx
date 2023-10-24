import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import baseUrl from './url';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Modal from '../components/Modal/Modal';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false)
      const [isLoginSuccessful, setLoginSuccessful] = useState(false);

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      const handleCloseModal = () => {
        setLoginSuccessful(false);
      };
    

      const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
          username,
          email,
          password,
        };

        setLoading(true);
        try {
          setLoading(true);
          const response = await fetch(`${baseUrl}public/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
        
          if (response.ok) {
            const user = await response.json();
            console.log('user: ', user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/Dashboard/AllJobs");
          } else {
            const errorData = await response.json();
            console.log('ERROR: ', errorData);
            setErrorMessage(errorData.message);
            setShowModal(true);
          }
        } catch (error) {
          console.log('ERROR: ', error);
          setErrorMessage(error.message);
          setShowModal(true);
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
       <div className="w-full h-screen flex justify-center items-center bg-slate-100">
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg shadow-indigo-600/10 dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h5 className="text-xl text-center font-bold text-gray-900 dark:text-white">{t('login_to_your_account')}</h5>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">{t('your_email')}</label>
            <input 
                 value={email}
                 onChange={handleEmailChange}
                 type="email" 
                 name="email" 
                 id="email" className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" placeholder="Gmail" 
                 required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">{t('your_password')}</label>
            <input 
                 value={password}
                 onChange={handlePasswordChange}
                 type="password" 
                 name="password" 
                 id="password" 
                 placeholder={t('password')} 
                 className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" required />
          </div>
          <div className="flex items-start">
            <a href="#" className="ml-auto text-sm text-indigo-700 hover:underline dark:text-indigo-500">{t('lost_password')}</a>
          </div>
          <button type="submit" className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">{t
          ('login')}</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{t('not_reg')} <Link to={'/Registration'} className="text-indigo-700 hover:underline dark:text-indigo-500">{t('create_Account')}</Link></div>
        </form>
        {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-200 p-4 rounded shadow w-5/6 sm:w-3/12">
            <p className="text-red-700 text-center">{error}</p>
            <button
              type="submit"
              className="mt-4 px-4 py-1 bg-blue-500 text-white rounded justify-end"
              onClick={() => setError('')}
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
      
</div>
{loading && <div>
    <LoadingSpinner />
</div>}
        {showModal && <Modal>
          <div className="bg-white md:w-5/12 w-10/12 max-w-screen-md rounded-lg m-4 flex flex-col relative shadow-2xl p-4 items-center justify-center">
            <p className=' text-center text-xl text-red-400'>{errorMessage}</p>
            <button onClick={() => setShowModal(false)} className='mt-6 bg-blue-500 w-2/6 text-white text-center rounded-md'>close</button>
          </div>
        </Modal>}
    </>
  )
}

export default Login