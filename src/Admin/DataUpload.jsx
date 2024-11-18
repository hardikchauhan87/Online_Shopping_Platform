import React, { useState } from 'react';

const OptionFields = ({ option, index, handleChange }) => (
  <div className="mb-3">
    {['Item'].map((size) => (
      <div key={size}>
        <label className="form-label">{size.charAt(0).toUpperCase() + size.slice(1)} Price</label>
        <input
          type="text"
          className="form-control"
          name={size}
          data-index={index}
          value={option[size]}
          onChange={handleChange}
        />
      </div>
    ))}
  </div>
);

const DataUpload = () => {
  const [itemData, setItemData] = useState({
    categoryName: '',
    name: '',
    img: '', // This will store the image URL
    options: [{ Item: '' }],
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;

    if (['Item'].includes(name)) {
      const index = parseInt(dataset.index, 10);
      const newOptions = [...itemData.options];
      newOptions[index] = { ...newOptions[index], [name]: value };
      setItemData({ ...itemData, options: newOptions });
    } else {
      setItemData({ ...itemData, [name]: value });
    }
  };

  const addOption = () => {
    setItemData((prevData) => ({
      ...prevData,
      options: [...prevData.options, { half: '', full: '', regular: '', medium: '', large: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { categoryName, name, img, options } = itemData;

    if (!categoryName || !name || !img || options.length === 0) {
      alert('Please fill in all required fields: Category Name, Item Name, and Image URL.');
      return;
    }

    const hasPrice = options.some((option) =>
      ['half','Item', 'full', 'regular', 'medium', 'large'].some((key) => option[key])
    );

    if (!hasPrice) {
      alert('Please provide at least one price in the options.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });

      const data = await response.json();
      if (data.message) {
        alert(data.message);
        setItemData({
          categoryName: '',
          name: '',
          img: '',
          options: [{Item:'',}],
          description: '',
        });
      } else {
        alert('Error uploading data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading data');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            name="categoryName"
            value={itemData.categoryName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={itemData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="img"
            value={itemData.img}
            onChange={handleChange}
            required
          />
        </div>

        <h4>Options</h4>
        {itemData.options.map((option, index) => (
          <OptionFields
            key={index}
            option={option}
            index={index}
            handleChange={handleChange}
          />
        ))}

        <div className="mb-3">
          <label className="form-label">Item Description (optional)</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={itemData.description}
            onChange={handleChange}
          />
        </div>

        <button type="button" className="btn btn-secondary mb-3" onClick={addOption}>
          Add Another Option
        </button>
        <button type="submit" className="btn btn-primary">Upload Item</button>
      </form>
    </div>
  );
};

export default DataUpload;