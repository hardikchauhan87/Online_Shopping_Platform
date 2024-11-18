import React, { useEffect, useState } from 'react';

import Card from '../Components/Card';

const Home = () => {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [fooditem, setFooditem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fooddata", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFooditem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
    
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://aispi.co/wp-content/uploads/2022/02/shopping.jpeg" className="d-block w-100 h-100" alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/08/google-shopping-ads-6304dccb7a49e-sej.png" className="d-block w-100 h-100" alt="Biryani" />
          </div>
          <div className="carousel-item">
            <img src="https://plus.unsplash.com/premium_photo-1661380434047-65f0e315ed04?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D" className="d-block w-100 h-100" alt="Biryani" />
          </div>
          <div className="carousel-item">
            <img src="https://www.fabhotels.com/blog/wp-content/uploads/2019/01/Shopping-3.jpg" className="d-block w-100 h-100" alt="Biryani" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container my-5'>
        {foodCat.length !== 0 ? foodCat.map((category, index) => (
          <div key={category._id || category.id}>
            {/* Category Header */}
            <h3 className='text-center text-uppercase'>{category.CategoryName}</h3>
            <hr className="mb-4" />

            {/* Food Items */}
            <div className='row g-3'>
              {fooditem.length !== 0 ? fooditem
                .filter(item =>
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filteredItem) => (
                  <div key={filteredItem._id} className='col-12 col-sm-6 col-md-4 col-lg-3'>
                    <Card foodItem={filteredItem} options={filteredItem.options[0]} />
                  </div>
                )) : (
                <div className="text-center">No items available in this category.</div>
              )}
            </div>

            {/* Horizontal Separator */}
            {index < foodCat.length - 1 && <hr className="my-5" />}
          </div>
        )) : <div className="text-center">No categories available.</div>}
      </div>
     
    </div>
  );
};

export default Home;
