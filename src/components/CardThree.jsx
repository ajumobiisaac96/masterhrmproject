import React from 'react';
import Manage from '../assets/manager card.jpg';

const CardThree = () => {
  const cardStyle = {
    width: '500px',
    height: '520px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
  };

  const imgStyle = {
    width: '90%',
    height: '90%',
    objectFit: 'cover',
  };

  const handleHover = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={cardStyle} onMouseOver={handleHover} onMouseOut={handleMouseOut}>
      <img src={Manage} alt="Manage Card" style={imgStyle} />
    </div>
  );
};

export default CardThree;
