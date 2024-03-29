import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import $api from '../http';
import { setUser } from '../store/slice/userSlice';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import ErrorNotification from '../components/ErrorNotification';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await $api.post('/login', data);
      console.log(response)
      dispatch(setUser({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user
      }));
      navigate('/collection')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage); 
      };
    }
  };

  const clearError = () => {
    setErrorMessage(null); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back!</h2>
          <p className='text-center'>Log in to your account.</p>
        </div>
        
        <AuthForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          formState={{ errors, isValid }}
          btnText={'Log in'}
        />

        {errorMessage && <ErrorNotification errorMessage={errorMessage} onClose={clearError} />}

        <p>
        New here? <Link className="text-lg text-cyan-600 font-bold hover:underline" to='/registration'>Create an account</Link>
        </p>
      </div>
     
    </div>
  )
}

export default LoginPage