import React from 'react';

const AuthForm = ({onSubmit, register, handleSubmit, formState: { errors }, isSignUp, btnText}) => {

    const brClasses = 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
    
      { isSignUp ? <input  
      type="text"
      placeholder="Enter Name" 
      {...register("username")}  
      className={ brClasses }
       />  
       : null 
       }
      <input  
      type='email'
      placeholder="email" 
      {...register("email")}  
      className={ brClasses } />
  
      <input 
      type='password'
      placeholder="password" 
      {...register("password", { required: true })}  
      className={ brClasses } />
  
      {errors.exampleRequired && <span>This field is required</span>}
  
      <input 
      type="submit" 
      value={btnText}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8" />
    </form>
    )
  }

export default AuthForm;