import React, { useState } from 'react'

const CollectionForm = ({onSubmit, register, handleSubmit, formState: { errors }, btnText, owner}) => {
  const [fields, setFields] = useState([{ name: "", type: "" }]);
  
  const handleAddField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" {...register("description", { required: true })} />
        {errors.description && <span>Description is required</span>}
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" {...register("category", { required: true })}>
          <option value="">Select category</option>
          <option value="Books">Books</option>
          <option value="Signs">Signs</option>
          <option value="Silverware">Silverware</option>
          <option value="Paintings">Paintings</option>
        </select>
        {errors.category && <span>Category is required</span>}
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input type="text" id="imageUrl" {...register("imageUrl")} />
      </div>

      <div>
        <label>Fields:</label>
        {fields.map((field, index) => (
          <div key={index}>
            <input type="text" {...register(`fields[${index}].name`, { required: true })} />
            <select {...register(`fields[${index}].type`, { required: true })}>
              <option value="">Select type</option>
              <option value="Integer">Integer</option>
              <option value="String">String</option>
              <option value="Text">Text</option>
              <option value="Boolean">Boolean</option>
              <option value="Date">Date</option>
            </select>
            <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddField}>Add Field</button>
      </div>

      {/* Owner field */}
      <input type="hidden" {...register("owner")} value={owner} />

      <button type="submit">{btnText}</button>
    </form>
    )
  }

export default CollectionForm;