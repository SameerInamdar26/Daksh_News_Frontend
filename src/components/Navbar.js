// frontend/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;


function Navbar() {
  const [date, setDate] = useState('');
  const [news, setNews] = useState([]);

  useEffect(() => {
    const today = new Date();
    setDate(
      today.toLocaleDateString('mr-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/news`) 
      .then((res) => setNews(res.data))
      .catch((err) => console.error('Error fetching news:', err));
  }, []);

  return (
    <div>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1A237E' }}>
        <div className="container-fluid">
          {/* Brand */}
          <Link
            className="navbar-brand"
            to="/"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            <span style={{ color: '#FFD700' }}>दक्ष २४</span>{' '}
            <span style={{ color: '#E74C3C' }}>न्यूज</span>
          </Link>

          {/* Hamburger toggle for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/">
                  मुखपृष्ठ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to="/admin">
                  प्रशासन
                </Link>
              </li>
            </ul>
          </div>

          {/* Date in corner */}
          <div
            style={{
              color: '#fff',
              fontFamily: "'Baloo 2', cursive",
              fontSize: '0.9rem',
              marginLeft: '15px',
            }}
          >
            {date}
          </div>
        </div>
      </nav>

      {/* Scrolling Headlines */}
      <div
        style={{
          backgroundColor: '#C62828',
          color: '#fff',
          padding: '5px',
          fontFamily: "'Tiro Devanagari Marathi', serif",
        }}
      >
        <marquee behavior="scroll" direction="left">
          {news.map((item, index) => (
            <span key={item._id}>
              <Link
                to={`/news/${item._id}`}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  marginRight: '30px',
                }}
              >
                {item.title}
              </Link>
              {index < news.length - 1 && ' | '}
            </span>
          ))}
        </marquee>
      </div>

      {/* Scrolling Ads/Announcements */}
      <div
        style={{
          backgroundColor: '#FFD700',
          color: '#000',
          padding: '5px',
          fontFamily: "'Baloo 2', cursive",
        }}
      >
        <marquee behavior="scroll" direction="left">
        जाहिरातीसाठी संपर्क &nbsp;:&nbsp; शब्बीर इनामदार 
        &nbsp; &nbsp;| &nbsp;&nbsp;&nbsp; 📞 9881642086 
        &nbsp; &nbsp;| &nbsp;&nbsp;&nbsp; <a href="https://wa.me/919881642086" target="_blank">🟢 WhatsApp</a> 
        &nbsp; &nbsp;| &nbsp;&nbsp;&nbsp; विशेष ऑफर 
        &nbsp; &nbsp;| &nbsp;&nbsp;&nbsp; आपल्या व्यवसायाची जाहिरात येथे करा..

        </marquee>
      </div>
    </div>
  );
}

export default Navbar;
