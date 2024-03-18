import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/slice/userSlice';

const LogoutButn = () => {

 const dispatch = useDispatch();
 return (
    <button 
        className="mr-4 rounded-full py-2 px-5 text-slate-400 hover:bg-neutral-100 hover:text-slate-950"
        onClick={() => dispatch(removeUser())}>
    Log out
    </button>
  )
}

export default LogoutButn