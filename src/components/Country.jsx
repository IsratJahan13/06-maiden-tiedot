import React from 'react';

const Country = ({ name, onClick }) => {
  const handleShowClick = () => {
    onClick(name);
  };

  return (
    <div>
      <p>{name} <button onClick={handleShowClick}>Show</button></p>
    </div>
  );
};

export default Country; 