/* eslint-disable */
import React, { useState, useEffect } from 'react';

function SnackMessage({ message }) {
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
    <div className={`fixed top-24 text-center rounded w-5/6 ml-auto mr-auto left-0 right-0 bg-green-500 text-white p-4 ${visible ? '' : 'hidden'} z-50 sm:w-2/6 top-96`}>
      <h1 className='font-bold text-xl'>{message}</h1>
    </div>
  );
}

export default SnackMessage;
