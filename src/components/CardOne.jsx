import React from 'react';
import SignUpCard from '../assets/Signup card.jpg';

const CardOne = () => {
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
      <img src={SignUpCard} alt="Sign Up Card" style={imgStyle} />
    </div>
  );
};

export default CardOne;
