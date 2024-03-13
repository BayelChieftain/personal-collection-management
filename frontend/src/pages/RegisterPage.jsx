import React from 'react'
import AuthForm from '../components/AuthForm'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/userSlice';
import $api from '../http';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await $api.post('/registration', data);
      console.log(response)
      response.data.accessToken
      dispatch(setUser({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user
      }));
    } catch (error) {
      console.log(error)
    }
  };
  
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
      </div>
      
        <AuthForm        
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors }}
        isSignUp = {true}
        btnText={'Sign up'}
        />

          <p>
                Or, <Link className="text-lg font-bold hover:underline" to='/login'>Log in</Link>
            </p>
            </div>
                  
                </div>
  )
}

export default RegisterPage