import React, { useState } from 'react';

const ErrorNotification = ({ errorMessage, onClose }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Ops:</strong>
          <span className="block sm:inline ml-2">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path fillRule="evenodd" d="M14.354 5.646a.5.5 0 01.708.708L10.707 10l4.354 4.354a.5.5 0 11-.708.708L10 10.707l-4.354 4.353a.5.5 0 01-.708-.708L9.293 10 4.94 5.646a.5.5 0 01.708-.708L10 9.293l4.354-4.647z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      );
};

export default ErrorNotification;
