import React from 'react';

const AuthForm = ({onSubmit, register, handleSubmit, formState: { errors, isValid }, isSignUp, btnText}) => {

  const brClasses = 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';
  const defClasses = 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600';
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>      
      { isSignUp ? 
        <div>
          <input  
            type="text"
            placeholder="Enter Name" 
            {...register("username", { required: "Name can't be blank" })}  
            className={ brClasses }
            onBlur={handleSubmit(onSubmit)} 
          />
          {errors.username && <p className='text-xs text-red-600'>{errors.username.message}</p>}
        </div>
       : null 
       }
        <input  
          type='email'
          placeholder="Email" 
          {...register("email", { required: "Email can't be blank",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          } 
          })}  
          className={ brClasses } 
          onBlur={handleSubmit(onSubmit)} 
        />
        <p className='text-xs text-red-600'>{errors.email?.message}</p>
        <input 
          type='password'
          placeholder="Password" 
          {...register("password", { required: "Password can't be blank", minLength: {
            value: 3,
            message: "Password must be at least 3 characters"
          } 
          })}  
          className={ brClasses } 
        />
        <p className='text-xs text-red-600'>{errors.password?.message}</p>
      
   
        <input 
          type="submit" 
          value={btnText}
          className={`${defClasses} ${!isValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'} mt-8`}
          disabled={!isValid}
          />
    </form>
  )
}

export default AuthForm;