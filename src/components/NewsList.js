// frontend/src/components/NewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL;

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/news`)
      .then(res => setNews(res.data))
      .catch(err => console.error("Error fetching news:", err));
  }, []);

  return (
    <div>
      {news.length === 0 ? (
        <p style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
          सध्या कोणतीही बातमी उपलब्ध नाही.
        </p>
      ) : (
        news.map(item => (
          <div 
            key={item._id} 
            className="card mb-4 shadow-sm"
            style={{ border: '1px solid #1A237E', borderRadius: '8px' }}
          >
            {/* Show image if available */}
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                className="card-img-top" 
                alt="news" 
                style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
              />
            )}
            <div className="card-body" style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
              {/* Headline in bold, dark black, larger font */}
              <h4 
                className="card-title" 
                style={{ 
                  color: '#212121', 
                  fontFamily: "'Baloo 2', cursive", 
                  fontWeight: 'bold', 
                  fontSize: '1.5rem' 
                }}
              >
                {item.title}
              </h4>

              {/* News snippet */}
              <p className="card-text" style={{ fontSize: '1rem', color: '#333' }}>
                {item.content ? item.content.substring(0, 120) : ""}...
              </p>

              {/* Marathi button */}
              <Link
                to={`/news/${item._id}`}
                className="btn"
                style={{
                  backgroundColor: '#C62828',
                  color: '#fff',
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 'bold',
                  borderRadius: '4px'
                }}
              >
                संपूर्ण बातमी
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NewsList;
