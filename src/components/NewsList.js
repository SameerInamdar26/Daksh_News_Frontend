// frontend/src/components/NewsList.js
import React from 'react';

function NewsList({ item }) {
  return (
    <img 
      src={item.imageUrl} 
      className="card-img-top" 
      alt={item.title} 
      style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
    />
  );
}

export default NewsList;
