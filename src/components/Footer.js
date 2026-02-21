// frontend/src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#2C3E50', color: '#fff', padding: '20px 0', marginTop: '30px' }}>
      <div className="container">
        <div className="row">
          {/* About / Tagline */}
          <div className="col-md-4">
            <h5 style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 'bold' }}>
              <span style={{ color: '#FFD700' }}>दक्ष २४</span>{' '}
              <span style={{ color: '#E74C3C' }}>न्यूज</span>
            </h5>
            <p style={{ fontFamily: "'Tiro Devanagari Marathi', serif", fontSize: '0.9rem' }}>
              मराठीतील ताज्या बातम्या आणि विशेष रिपोर्ट् स 
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6></h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>मुखपृष्ठ</a></li>
              <li><a href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>प्रशासन</a></li>
              <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>संपर्क</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h6>सोशल मीडिया</h6>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.2rem' }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.2rem' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.2rem' }}>
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.2rem' }}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3" style={{ fontSize: '0.85rem' }}>
          © 2026 Daksh 24 News. सर्व हक्क राखीव.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
