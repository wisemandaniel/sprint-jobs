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
    <div className={`fixed top-4 text-center rounded w-2/6 ml-auto mr-auto left-0 right-0 bg-green-500 text-white p-4 ${visible ? '' : 'hidden'}`}>
      <h1 className='font-bold text-2xl'>{message}</h1>
    </div>
  );
}

export default SnackMessage;
