import React, { useState } from 'react'

const CollectionForm = ({onSubmit, register, handleSubmit, formState: { errors }, btnText, owner}) => {
  const [fields, setFields] = useState([{ name: '', type: '' }]);
  
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
  

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
        <input type="text" id="name" {...register("name", { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
        <input type="text" id="description" {...register("description", { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        {errors.description && <span className="text-red-500">Description is required</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
        <select id="category" {...register("category", { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="">Select category</option>
          <option value="Books">Books</option>
          <option value="Signs">Signs</option>
          <option value="Silverware">Silverware</option>
          <option value="Paintings">Paintings</option>
        </select>
        {errors.category && <span className="text-red-500">Category is required</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL:</label>
        <input type="text" id="imageUrl" {...register("imageUrl")} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
              className="mr-2 mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <select
              value={field.type}
              {...register(`fields[${index}].type`, { required: true })}
              onChange={(event) => handleChangeField(index, 'type', event.target.value)}
              className="mr-2 mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{btnText}</button>
    </form>
    )
  }

export default CollectionForm;