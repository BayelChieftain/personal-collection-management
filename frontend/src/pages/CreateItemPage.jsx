import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import $api from '../http';
import ItemForm from '../components/ItemForm';
import { useIds } from '../hooks/userIds';


const CreateItemPage = () => {

  const { collections } = useIds();
  
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
} = useForm();

const onSubmit = async (data) => {
  try {
      data.dynamicFields = data.dynamicFields.filter(field => field.name.trim() !== '' || field.value.trim() !== '');
      console.log(data)
      const response = await $api.post('/collections/items', data);
      console.log(response)
      navigate('/collection')
  } catch (error) {
      console.log(error)
  }
}


  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create Item</h1>
      <ItemForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isValid }}
        btnText={'Create Item'}
        collections={collections}
      />
    </div>
  </>
  )
}

export default CreateItemPage;