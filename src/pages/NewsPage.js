import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

function NewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [likes, setLikes] = useState(50);
  const [newComment, setNewComment] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState("");
  const commentsEndRef = useRef(null);

  // Fetch single news (with comments)
  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/news/${id}`);
      setNews(res.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  // Auto-scroll to latest comment
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [news]);

  if (!news) return <p>लोड होत आहे...</p>;

  const currentUrl = window.location.href;

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setShowNamePrompt(true);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim() !== "" && newComment.trim() !== "") {
      try {
        await axios.post(`${API_BASE}/api/news/${id}/comments`, {
          name: userName,
          text: newComment
        });
        await fetchNews(); // refresh with updated comments
        setNewComment("");
        setUserName("");
        setShowNamePrompt(false);
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  };

  return (
    <div className="container my-4" style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
      {/* Headline */}
      <h2 style={{ color: '#212121', fontFamily: "'Baloo 2', cursive", fontWeight: 'bold', fontSize: '2rem' }}>
        {news.title}
      </h2>

      {/* Image */}
      {news.imageUrl && (
        <img src={news.imageUrl} alt="news" className="img-fluid my-3" style={{ borderRadius: '8px' }} />
      )}

      {/* Sampadak */}
      {news.sampadak && (
        <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '10px' }}>
          संपादक: {news.sampadak}
        </p>
      )}

      {/* Content */}
      <p style={{ fontSize: '1.1rem', color: '#333' }}>{news.content}</p>

      {/* Likes */}
      <div className="mt-4">
        <button 
          onClick={handleLike} 
          className="btn btn-light shadow-sm" 
          style={{ width: '55px', height: '55px', borderRadius: '50%', fontSize: '1.5rem', color: '#E74C3C' }}
        >
          ❤️
        </button>
        <span style={{ marginLeft: '10px', fontWeight: 'bold', fontFamily: "'Baloo 2', cursive" }}>
          {likes} Likes
        </span>
      </div>

      {/* Comments */}
      <div className="mt-3">
        <h5 style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 'bold' }}>आपले मत द्या:</h5>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="आपली प्रतिक्रिया लिहा..." 
            className="form-control rounded-pill shadow-sm"
          />
          <button type="submit" className="btn btn-primary rounded-pill"> Comment </button>
        </form>
        <ul className="mt-3 list-group">
          {news.comments && news.comments.map((c) => (
            <li key={c._id} className="list-group-item">
              <strong>{c.name}:</strong> {c.text}
            </li>
          ))}
          <div ref={commentsEndRef}></div>
        </ul>
      </div>

      {/* Name Prompt Modal */}
      {showNamePrompt && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">आपले नाव लिहा</h5>
                <button type="button" className="btn-close" onClick={() => setShowNamePrompt(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleNameSubmit}>
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    placeholder="नाव" 
                    className="form-control mb-3"
                  />
                  <button type="submit" className="btn btn-success">सबमिट</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsPage;
