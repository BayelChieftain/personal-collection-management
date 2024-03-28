import React from 'react'
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import CollectionPage from './pages/CollectionPage';
import { useAuth } from './hooks/userAuth';
import CreateCollectionPage from './pages/CreateCollectionPage';
import CreateItemPage from './pages/CreateItemPage';
import CollectionDetailsPage from './pages/CollectionDetailsPage';

const App = () => {

  const { isAuth } = useAuth();
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/registration' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/adminDashboard' element={<AdminPage />} />
      { isAuth && <Route path='/collection' element={<CollectionPage />} />}
      <Route path='/create-collection' element={<CreateCollectionPage />} />
      <Route path='/create-item' element={<CreateItemPage />} />
      <Route path="collection/:id" element={<CollectionDetailsPage />} />
    </Routes>

  )
}

export default App;