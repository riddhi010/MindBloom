import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Journal.css"; 

const Journal = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

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
                src={`http://localhost:5000/uploads/${post.image}`}
                alt="Post"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
