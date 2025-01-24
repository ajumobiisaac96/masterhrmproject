import React from 'react';
import Import from '../assets/import card.jpg';

const CardTwo = () => {
  const cardStyle = {
    width: '400px',
    height: '400px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
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
      <img src={Import} alt="Import Card" style={imgStyle} />
    </div>
  );
};

export default CardTwo;
