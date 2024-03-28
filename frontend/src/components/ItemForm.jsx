import React, { useState } from 'react';
import $api from '../http';

const brClasses = 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

const ItemForm = ({ onSubmit, register, handleSubmit, formState: { errors, isValid  }, btnText, collections }) => {
  const [fields, setFields] = useState([{ name: "", value: "" }]);
  const [imageUrlfr, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  
  const handleAddField = () => {
    setFields([...fields, { name: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
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
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags:</label>
        <input type="text" id="tags" {...register("tags")} className={brClasses} />
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
        <label className="block text-sm font-medium text-gray-700">Dynamic Fields:</label>
        {fields.map((field, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input type="text" {...register(`dynamicFields[${index}].name`, { required: true })} className={`w-1/3 ${brClasses}`} placeholder="Field Name" />
            <input type="text" {...register(`dynamicFields[${index}].value`)} className={`w-1/3 ${brClasses}`} placeholder="Field Value" />
            <button type="button" onClick={() => handleRemoveField(index)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddField} className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Add Field</button>
      </div>

      <div className="mb-4">
        <label htmlFor="collectionRef" className="block text-sm font-medium text-gray-700">Collection:</label>
        <select id="collectionRef" {...register("collectionRef")} className={brClasses}>
          <option value="">Select a Collection</option>
          {collections.map(collection => (
            <option key={collection.id} value={collection.id}>{collection.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={!isValid} className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${!isValid && 'opacity-50 cursor-not-allowed'}`}>{btnText}</button>
    </form>
  );
};

export default ItemForm;
