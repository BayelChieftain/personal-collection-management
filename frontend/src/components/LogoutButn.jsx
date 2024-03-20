import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/slice/userSlice';
import $api from '../http';

const LogoutButn = () => {
 const dispatch = useDispatch();
 
 const handleLogout = async () => {
  try {
    await $api.post('/logout'); 
    dispatch(removeUser());
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

  return (
    <button
      className="mr-4 rounded-full py-2 px-5 text-slate-400 hover:bg-neutral-100 hover:text-slate-950 bg-neutral-200/80"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
};

export default LogoutButn