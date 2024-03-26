import React from 'react'
import Header from '../components/Header'
import CollectionForm from '../components/CollectionForm'
import { useForm } from 'react-hook-form';
import $api from '../http';
import { useAuth } from '../hooks/userAuth';

const CreateCollectionPage = () => {
const { 
    register, 
    handleSubmit, 
    formState: { errors } 
} = useForm();

const onSubmit = async (data) => {
    try {
        console.log(data)
        const response = await $api.post('/collections', data);
        console.log(response)
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
        formState={{ errors }}
        btnText={'Add Collection'}
        owner={user.id}
      />
    </div>
  </>
  )
}

export default CreateCollectionPage