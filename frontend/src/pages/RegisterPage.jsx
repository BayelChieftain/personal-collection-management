import React from 'react'
import AuthForm from '../components/AuthForm'
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slice/userSlice';
import $api from '../http';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await $api.post('/registration', data);
      console.log(response)
      dispatch(setUser({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user
      }));
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-NSans">Never lose track of an item again.</h2>
          <p className="mt-2 font-light font-Poppins text-gray-500">Simple, fast and powerful inventory software for businesses and teams to stay organized.</p>
        </div>
        
      
        <AuthForm        
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          formState={{ errors, isValid }}
          isSignUp = {true}
          btnText={'Create account'}
        />
           
          <p>
          Already have an account? <Link className="text-lg text-cyan-600 font-bold hover:underline" to='/login'>Log in</Link>
          </p>
      </div>
                  
    </div>
  )
}

export default RegisterPage