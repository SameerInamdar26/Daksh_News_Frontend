// frontend/src/pages/Home.js
import React from 'react';
import NewsList from '../components/NewsList';

function Home() {
  return (
    <div>
      <h2 className="mb-4">ताज्या बातम्या</h2>
      <NewsList />
    </div>
  );
}

export default Home;
