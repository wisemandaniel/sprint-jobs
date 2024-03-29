/* eslint-disable */
import React from 'react';

function Button({ text, handleClick }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-orange-400 text-white text-lg mx-auto my-6 px-2 py-1 rounded-md"
    >
      {text}
    </button>
  );
}

export default Button;
