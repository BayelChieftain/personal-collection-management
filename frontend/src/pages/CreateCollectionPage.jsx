import React from 'react'
import Header from '../components/Header'
import CollectionForm from '../components/CollectionForm'
import { useForm } from 'react-hook-form';
import $api from '../http';
import { useAuth } from '../hooks/userAuth';
import { useNavigate } from 'react-router-dom';

const CreateCollectionPage = () => {
  const navigate = useNavigate();
const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
} = useForm();

const onSubmit = async (data) => {
    try {
      const filteredData = {
        ...data,
        fields: data.fields.filter(field => field.name.trim() !== '' && field.type.trim() !== '')
      };
        console.log(filteredData)
        const response = await $api.post('/collections', filteredData);
        console.log(response)
        navigate('/collection')
    } catch (error) {
        console.log(error)
    }
}

const { user } = useAuth();

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create Collection</h1>
      <CollectionForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isValid }}
        btnText={'Create Collection'}
        owner={user.id}
      />
    </div>
  </>
  )
}

export default CreateCollectionPage