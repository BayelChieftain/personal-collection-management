import React, { useState } from 'react';
import $api from '../http';

const brClasses = 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';
const slClasses = 'bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5';
const defClasses = 'px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'

const CollectionForm = ({onSubmit, register, handleSubmit, formState: { errors, isValid }, btnText, owner}) => {
  const [fields, setFields] = useState([{ name: '', type: '' }]);
  const [file, setFile] = useState(null);
  const [imageUrlfr, setImageUrl] = useState(null);

  const handleAddField = () => {
    setFields([...fields, { name: '', type: '' }]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleChangeField = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    uploadFile(event.target.files[0]); 
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('imageUrl', file);

      const response = await $api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded successfully:', response.data);
      setImageUrl(response.data); 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFormSubmit = (data) => {
    data.imageUrl = imageUrlfr;
    onSubmit(data);
  };

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
        <input type="text" id="name" {...register("name", { required: true })} className={brClasses} />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
    
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" {...register("description", { required: true })} className={brClasses} />
        {errors.description && <span className="text-red-500">Description is required</span>}  
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
        <select id="category" {...register("category", { required: true })} className={slClasses}>
          <option value="">Select category</option>
          <option value="Books">Books</option>
          <option value="Signs">Signs</option>
          <option value="Silverware">Silverware</option>
          <option value="Paintings">Paintings</option>
        </select>
        {errors.category && <span className="text-red-500">Category is required</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image:</label>
        <input 
        type="file" 
        id="imageUrl" 
        {...register("imageUrl")} 
        onChange={handleFileChange} 
        className="appearance-none hidden w-full text-sm text-gray-900 border border-purple-300 rounded-lg cursor-pointer bg-purple-50 dark:text-gray-400 focus:outline-none dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
         />
        <label htmlFor="imageUrl" className='group relative w-full flex justify-center py-1 px-3 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-purple-600 cursor-pointer hover:bg-purple-700'>
          Upload Image
        </label>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Fields:</label>
        {fields.map((field, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={field.name}
              {...register(`fields[${index}].name`, { required: true })}
              onChange={(event) => handleChangeField(index, 'name', event.target.value)}
              placeholder="Name"
              className={brClasses}
            />
            <select
              value={field.type}
              {...register(`fields[${index}].type`, { required: true })}
              onChange={(event) => handleChangeField(index, 'type', event.target.value)}
              className={`mr-2 ml-2 mt-1 block w-1/2 ${slClasses}`}
            >
              <option value="">Select type</option>
              <option value="Integer">Integer</option>
              <option value="String">String</option>
              <option value="Text">Text</option>
              <option value="Boolean">Boolean</option>
              <option value="Date">Date</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Add Field
        </button>
      </div>      

      {/* Owner field */}
      <input type="hidden" {...register("owner")} value={owner} />

     
      <button type="submit" 
      className={`${defClasses} ${isValid ? '' : 'opacity-50 cursor-not-allowed'}`}
      disabled={!isValid} 
      >
        {btnText}
      </button>
    </form>
    )
  }

export default CollectionForm;