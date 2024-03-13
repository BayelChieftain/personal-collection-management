import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="text-white p-4 flex justify-between items-center border-2 border-white border-b-zinc-300/50">
      <div>
        <Link to="/" className="font-Caveat text-3xl font-bold text-purple-500">
          BAYcollect
        </Link>
      </div>
      <div className="flex items-center">
      <div className="ml-4 mr-3 text-slate-400">
          {/* Здесь будет ваш поисковик */}
          {/* Например, для иллюстрации: */}
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
          />
        </div>
        <Link to="/login" className="mr-4 text-slate-400">
          Log in
        </Link>
        <Link to="/register" className="mr-4 rounded-full px-4 py-2 bg-purple-500 text-white">
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Header;
