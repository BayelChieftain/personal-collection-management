import React from 'react'
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/registration' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>

  )
}

export default App;