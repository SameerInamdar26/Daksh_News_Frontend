// frontend/src/pages/Home.js
import React from 'react';
import NewsList from '../components/NewsList';

function Home() {
  return (
    <div className="container my-4">
      <h2 
        className="mb-4" 
        style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 'bold', color: '#212121' }}
      >
        ताज्या बातम्या
      </h2>
      <NewsList />
    </div>
  );
}

export default Home;
