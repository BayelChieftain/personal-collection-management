import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import $api from '../http'; 
import Header from '../components/Header';
import { useAuth } from "../hooks/userAuth";
import Preloader from "../components/Preloader";
import { useDispatch } from "react-redux";
import { addCollection, removeCollection } from '../store/slice/idSlice';

const CollectionPage = () => {
  const [collections, setCollections] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await $api.get(`/collections/my/${user.id}`);
      const collectionsData = response.data;
      setCollections(collectionsData);
      dispatch(removeCollection());
      collectionsData.forEach(collection => {
        dispatch(addCollection(collection));
      });
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Collections</h1>
            <div>
              <button 
                className="bg-purple-500 text-white px-4 py-2 rounded mr-4" 
                onClick={() => navigate('/create-collection')}
              >
                Add Collection
              </button>
              <button 
                className="bg-purple-500 text-white px-4 py-2 rounded" 
                onClick={() => navigate('/create-item')}
              >
                Add Item
              </button>
            </div>
        </div>
        { loading ? <Preloader /> : null }
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map(collection => (
            <div key={collection._id}>
              <Link to={`/collection/${collection._id}`}>
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  {collection.imageUrl && (
                    <img 
                      src={collection.imageUrl} 
                      alt={collection.name} 
                      className="object-cover w-full rounded-t-lg h-36 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
                    />
                  )}
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{collection.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{collection.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollectionPage;