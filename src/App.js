// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import Admin from './pages/Admin';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home />} />

            {/* Single news page */}
            <Route path="/news/:id" element={<NewsPage />} />

            {/* Admin dashboard */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
