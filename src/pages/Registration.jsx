import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import baseUrl from './url';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

function Registration() {
  
      const { t } = useTranslation();

      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false)
      const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);

      const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      const handleCloseModal = () => {
        setRegistrationSuccessful(false);
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
          const response = await fetch(`${baseUrl}auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    
          if (response.ok) {
            setLoading(false);
            setRegistrationSuccessful(true);
          } else {
            const errorData = await response.json();
            setError(errorData.message);
          }
        } catch (error) {
          setLoading(false);
          console.error('Error registering user:', error);
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
       <div className="w-full h-screen flex justify-center items-center bg-slate-100">
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg shadow-indigo-600/10 dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h5 className="text-xl text-center font-bold text-gray-900 dark:text-white">{t('create_account')}</h5>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">{t('your_username')}</label>
            <input 
               value={username} 
               onChange={handleUsernameChange}
               type="text" 
               name="username" 
               id="username" 
               className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
               placeholder={t('username')} 
               required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">{t('your_email')}</label>
            <input 
               value={email} 
               onChange={handleEmailChange}
               type="email" 
               name="email" 
               id="email" 
               className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
               placeholder="Gmail" 
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
               className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
               required />
          </div>
          <div className="flex items-start">
          </div>
          <button 
              type="submit" 
              className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">{t('Register_text')}</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{t('already_have_an_Account')} <Link to={'/Login'} className="text-indigo-700 hover:underline dark:text-indigo-500">
            {t('login')}</Link></div>
        </form>
      </div>
      
</div>
{loading && <div>
    <LoadingSpinner />
</div>}
    </>
  )
}

export default Registration