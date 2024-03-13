import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <>
    <Header />
    <div className="text-center mt-8">
      <h1 className="text-7xl font-bold mb-4 mt-5 font-NSans">     
        <span className='text-purple-500'>Simple</span> Inventory
        <br/>       
         Management Software.
      </h1>
      <p className="text-gray-600 mb-8 mt-10 text-2xl text-center">
        The best inventory software for small businesses to manage inventory, supplies,
        <br/>   
       and everything else.
      </p>
      <div className='mt-16'>
        <Link to="/registration" className="bg-purple-500 text-white font-medium py-5 px-7 mt-6 rounded-full text-xl font-NSans hover:bg-purple-600 text-center">
          Try BAYcollect now
        </Link>
      </div> 
    </div>
    </>
  );
}

export default HomePage;