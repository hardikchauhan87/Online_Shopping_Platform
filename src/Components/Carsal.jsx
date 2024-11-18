import React from 'react';

const Carsal = () => {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>

                    <div className='carosel-caption' style={{zIndex:"10"}}>
                        <form className="d-flex" >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="/Burger1.png" className="d-block im1 w-100" alt="Pizza" />
                    </div>
                    <div className="carousel-item">
                        <img src="/biryani1.png" className="d-block im1 w-100" alt="Pasta" />
                    </div>
                    <div className="carousel-item">
                        <img src="/Burger1.png" className="d-block im1 w-100" alt="Burger" />
                    </div>
                    <div className="carousel-item">
                        <img src="/biryani1.png" className="d-block im1 w-100" alt="Salad" />
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
        </div>
    );
};

export default Carsal;
