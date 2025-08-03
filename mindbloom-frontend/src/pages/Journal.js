import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Journal.css";

const Journal = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // posts per page

  useEffect(() => {
    axios
      .get(`https://mindbloom-pg24.onrender.com/api/posts?page=${currentPage}&limit=${limit}`)
      .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="journal-page">
      <h1 className="journal-title">📝 Journal</h1>
      <div className="journal-posts">
        {posts.map((post) => (
          <div key={post._id} className="journal-card">
            <div className="card-header">
              <h3>@{post.username}</h3>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="card-content">{post.content}</p>
            {post.image && (
              <img
                className="card-image"
                src={`https://mindbloom-pg24.onrender.com/uploads/${post.image}`}
                alt="Post"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          ◀ Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Journal;
