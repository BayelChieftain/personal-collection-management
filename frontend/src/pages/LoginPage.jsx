import React from 'react'
import { useForm } from 'react-hook-form';
import $api from '../http';
import { setUser } from '../store/slice/userSlice';
import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';


const LoginPage = () => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await $api.post('/login', data);
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
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in</h2>
      </div>
      <AuthForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors }}
        btnText={'Log in'}
      />
      <p>
                Or, <Link className="text-lg font-bold hover:underline" to='/registration'>Sign up</Link>
            </p>
            </div>
     
    </div>
  )
}

export default LoginPage