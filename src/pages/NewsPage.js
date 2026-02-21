// frontend/src/pages/NewsPage.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const API_BASE = process.env.REACT_APP_API_URL;

function NewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [userName, setUserName] = useState("");
  const commentsEndRef = useRef(null);

  // Fetch single news (with comments)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, [id]);

  // Auto-scroll to latest comment
  useEffect(() => {
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [news]);

  // Block right-click (copy prevention)
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Detect screenshot keys (PrintScreen, Ctrl+Shift+S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen" || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s")) {
        document.body.style.filter = "blur(5px)";
        setTimeout(() => {
          document.body.style.filter = "none";
        }, 2000);
        alert("⚠️ Screenshots are discouraged on this site.");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!news) return <p>लोड होत आहे...</p>;

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
        const res = await axios.get(`${API_BASE}/api/news/${id}`);
        setNews(res.data);
        setNewComment("");
        setUserName("");
        setShowNamePrompt(false);
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  };

  return (
    <div className="container my-4 position-relative" style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
      {/* ✅ Dynamic Open Graph Meta Tags
      <Helmet>
        <title>{news.title}</title>
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.content.substring(0, 100)} />
        <meta property="og:image" content={news.imageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={news.content.substring(0, 100)} />
        <meta name="twitter:image" content={news.imageUrl} />
      </Helmet> */}

      {/* Watermark overlay */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "4rem",
        opacity: 0.05,
        pointerEvents: "none",
        fontWeight: "bold"
      }}>
        Daksh 24 News
      </div>

      {/* Headline */}
      <h2 style={{ color: '#212121', fontFamily: "'Baloo 2', cursive", fontWeight: 'bold', fontSize: '2rem' }}>
        {news.title}
      </h2>

      {/* Image */}
      {news.imageUrl && (
        <img src={news.imageUrl} alt="news" className="img-fluid my-3 rounded" />
      )}

      {/* Sampadak */}
      {news.sampadak && (
        <p className="fst-italic text-muted mb-2">
          संपादक: {news.sampadak}
        </p>
      )}

      {/* Content (no-select to block copy) */}
      <p style={{ fontSize: '1.1rem', color: '#333', userSelect: "none" }}>
        {news.content}
      </p>

      {/* Social Share */}
      <div className="mt-4 d-flex align-items-center gap-3 flex-wrap">
        <a href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="btn btn-success rounded-pill">WhatsApp</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded-pill">Facebook</a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`} target="_blank" rel="noopener noreferrer" className="btn btn-info rounded-pill text-white">Twitter</a>
        <a href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="btn btn-danger rounded-pill">Instagram</a>
      </div>

      {/* Comments */}
      <div className="mt-3">
        <h5 className="fw-bold" style={{ fontFamily: "'Baloo 2', cursive" }}>आपले मत द्या:</h5>
        <form onSubmit={handleCommentSubmit} className="d-flex gap-2">
          <input 
            type="text" 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="आपली प्रतिक्रिया लिहा..." 
            className="form-control rounded-pill shadow-sm"
          />
          <button type="submit" className="btn btn-primary rounded-pill">Comment</button>
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
