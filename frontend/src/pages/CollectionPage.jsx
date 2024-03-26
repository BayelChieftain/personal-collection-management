import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import $api from '../http'; 
import Header from '../components/Header';
import { useAuth } from "../hooks/userAuth";
import Preloader from "../components/Preloader";
import { useDispatch } from "react-redux";
import { addCollectionId } from "../store/slice/idSlice";


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
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionClick = (collectionId) => {
    dispatch(addCollectionId(collectionId)); 
  };


  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Collections</h1>
            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded" 
              onClick={() => navigate('/create-collection')}
            >
              Add Collection
            </button>
        </div>
        { loading ? <Preloader /> : null }
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map(collection => (
            <div key={collection._id}>
              <Link to={`/collection/${collection._id}`} onClick={() => handleCollectionClick(collection._id)}>
                <div className="bg-white shadow-md rounded p-4">
                  <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
                  <p className="text-gray-600">{collection.description}</p>
                  <p className="text-gray-600">Category: {collection.category}</p>
                  {collection.imageUrl && (
                    <img 
                      src={collection.imageUrl} 
                      alt={collection.name} 
                      className="mt-2 w-full max-h-10 object-contain"
                    />
                  )}
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