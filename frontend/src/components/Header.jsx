import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import LogoutButn from './LogoutButn';
import { useAuth } from '../hooks/userAuth';

const Header = () => {
  const { isAuth } = useAuth();



  return (
    <header className="text-white p-4 flex justify-between items-center border-2 border-white border-b-zinc-300/50">
      <div>
        <Logo />
      </div>
      <div className="flex items-center">
      <div className="ml-4 mr-3 text-slate-400">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
          />
        </div>
        
        { isAuth ? <LogoutButn /> 
        :  <div>
        <Link to="/login" className="mr-4 rounded-full py-2 px-5 text-slate-400 hover:bg-neutral-100 hover:text-slate-950">
          Log in
        </Link>
        <Link to="/registration" className="mr-4 rounded-full px-4 py-2 bg-purple-500 text-white hover:bg-purple-600">
          Sign up
        </Link>
        </div>
        
        }
      </div>
    </header>
  );
};

export default Header;

