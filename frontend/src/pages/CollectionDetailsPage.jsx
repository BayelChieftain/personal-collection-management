import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $api from '../http';
import Header from '../components/Header';

const CollectionDetailsPage = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await $api.get(`/collections/${id}`);
        setCollection(response.data);
      } catch (error) {
        console.error('Error fetching collection:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const { name, description, imageUrl, createdAt, updatedAt, fields } = collection;

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8 bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">{name}</h1>
      <p className="text-gray-700 mb-4 text-lg leading-loose">{description}</p>
      <img
        src={imageUrl}
        alt={name}
        className="w-36 h-auto object-cover mb-4"
      />
      <div className="flex mb-4 justify-between">
        <p className="text-gray-700 text-sm">Created At: {new Date(createdAt).toLocaleString()}</p>
        <p className="text-gray-700 text-sm">Last Updated At: {new Date(updatedAt).toLocaleString()}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-indigo-600">Fields</h2>
        <ul className="list-disc pl-4">
          {fields.map(field => (
            <li key={field._id} className="text-gray-700 mb-1">
              {field.name}: {field.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default CollectionDetailsPage;
