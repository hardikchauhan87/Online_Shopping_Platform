import React, { useState } from 'react';

const UploadCat = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/foodCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CategoryName: categoryName }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Category uploaded successfully!');
        setCategoryName(''); // Reset the input field
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading category:', error);
      alert('An error occurred while uploading the category.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload Category
        </button>
      </form>
    </div>
  );
};

export default UploadCat;
