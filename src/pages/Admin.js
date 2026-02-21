import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

function Admin() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Upload form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [sampadak, setSampadak] = useState("");

  // News list states
  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchNews();
    }
  }, [token]);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/news`);
      setNewsList(res.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  // Admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("❌ Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Upload new news
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);
    formData.append("sampadak", sampadak);

    try {
      await axios.post(`${API_BASE}/api/news`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ News posted successfully!");
      setTitle(""); setContent(""); setImage(null); setSampadak("");
      fetchNews();
    } catch (err) {
      console.error("Error posting news:", err);
      alert("❌ Error posting news");
    }
  };

  // Delete news
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await axios.delete(`${API_BASE}/api/news/${id}`);
      alert("🗑️ News deleted");
      fetchNews();
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  // Start editing
  const startEdit = (news) => {
    setEditingNews(news);
    setTitle(news.title);
    setContent(news.content);
    setSampadak(news.sampadak);
  };

  // Save edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("sampadak", sampadak);
    if (image) formData.append("image", image);

    try {
      await axios.put(`${API_BASE}/api/news/${editingNews._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✏️ News updated successfully!");
      setEditingNews(null);
      setTitle(""); setContent(""); setSampadak(""); setImage(null);
      fetchNews();
    } catch (err) {
      console.error("Error updating news:", err);
    }
  };

  // Delete comment
  const handleDeleteComment = async (newsId, commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await axios.delete(`${API_BASE}/api/news/${newsId}/comments/${commentId}`);
      alert("🗑️ Comment deleted");
      fetchNews();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // If not logged in, show login form
  if (!token) {
    return (
      <div className="container mt-5">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  // If logged in, show admin panel
  return (
    <div className="container">
      <h2 className="mb-4">Admin Panel - Post News</h2>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Upload Section */}
      <form onSubmit={editingNews ? handleUpdate : handleSubmit}>
        {/* ... your existing upload form code ... */}
      </form>

      {/* Manage Section */}
      <h2 className="mt-5 mb-3">Manage News</h2>
      {newsList.map((n) => (
        <div key={n._id} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{n.title}</h5>
            <p className="card-text">संपादक: {n.sampadak}</p>
            <p className="card-text">Views: {n.views || 0}</p>
            <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(n)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(n._id)}>Delete</button>

            <h6 className="mt-3">Comments:</h6>
            {n.comments && n.comments.length > 0 ? (
              <ul className="list-group">
                {n.comments.map((c) => (
                  <li key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span><strong>{c.name}:</strong> {c.text}</span>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteComment(n._id, c._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
