import React, { useState, useEffect } from 'react';

function ErrorSnackMessage({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`fixed top-42 text-center rounded w-5/6 ml-auto mr-auto left-0 right-0 bg-red-400 text-white p-4 ${visible ? '' : 'hidden'} z-50 sm:w-2/6`}>
      <h1 className='font-bold text-xl'>{message}</h1>
    </div>
  );
}

export default ErrorSnackMessage;
