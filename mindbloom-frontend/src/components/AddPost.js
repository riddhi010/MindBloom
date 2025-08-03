import React, { useState } from "react";
import axios from 'axios';
import "./AddPost.css";

const AddPost = ({ onPostAdded }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleAddPost = async () => {
    if (!postText.trim() && !postImage) return;

    const formData = new FormData(); //creates new form data object, used to send other info. with post 
    formData.append("userId", currentUser.id);
    formData.append("username", currentUser.username);
    formData.append("content", postText);
    if (postImage) formData.append("image", postImage);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Inform parent
      if (onPostAdded) onPostAdded(res.data);

      // Clear form
      setPostText("");
      setPostImage(null);
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPostImage(e.target.files[0]);
    }
  };

  return (
    <div className="add-post">
      <textarea
        placeholder="Share how you feel today..."
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleAddPost}>Post</button>
    </div>
  );
};

export default AddPost;
