import React from "react";
import "./Home.css";
import { useState } from "react";
import banner1 from "./images/banner1.png";
import banner2 from "./images/banner2.png";
import modelMens from "./images/mens-model.png";
import modelWomens from "./images/womens-model.png";
import { Link } from "react-router-dom";

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrls = [banner1, banner2];

  const handleNextImage = () => {
    setCurrentImageIndex(currentImageIndex ? 0 : 1);
  };

  return (
    <div className="home">
      <header className="home-header">
        <img src={imageUrls[currentImageIndex]} alt="Collage" />
        <button className="home-header-arrow" onClick={handleNextImage}>
          <svg viewBox="0 0 24 24" width="90" height="90">
          <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"></path>
          </svg>
        </button>
      </header>
      <div className="home-choosePath-title">
        <h1>Forged Fashion</h1>
        <h2>Select Styles</h2>
      </div>
      <div className="home-choosePath-container">
        <div className="home-choosePath-left">
          <h2>Mens</h2>
          <Link to="/mens"><img src={modelMens} alt="men's model" /></Link>
        </div>
        <div className="home-choosePath-right">
          <h2>Womens</h2>
          <Link to="/womens"><img src={modelWomens} alt="women's model" /></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
