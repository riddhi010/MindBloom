import React, { useState, useEffect } from "react";
import "./MyAccount.css";
import AddPost from "../components/AddPost";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
  const [user, setUser] = useState({ 
    id: "",
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && (storedUser.id || storedUser._id)) {
      const userId = storedUser.id || storedUser._id;
      const completeUser = {
        ...storedUser,
        id: userId,
      };
      
      setUser(completeUser);
      setFormData(completeUser);

      axios
        .get(`http://localhost:5000/api/posts/user/${storedUser.id || storedUser._id}`)

        .then((res) => {
          console.log(res.data);
          setMyPosts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user's posts:", err);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const imageFile = files[0];
      const preview = URL.createObjectURL(imageFile);
      setFormData({ ...formData, profilePicture: preview, imageFile });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("bio", formData.bio);
    if (formData.imageFile) {
      form.append("image", formData.imageFile);
    }

    axios
      .put(`http://localhost:5000/api/profile/${user.id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const updated = { ...res.data, id: res.data._id };
        setUser(updated);

        setFormData(updated);
        localStorage.setItem("user", JSON.stringify(updated));
        setEditMode(false);
        alert("Profile updated!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Failed to update profile.");
      });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://localhost:5000/api/profile/${user.id}`)
        .then(() => {
          localStorage.removeItem("user");
          alert("Account deleted successfully.");
          navigate("/register");
        })
        .catch((err) => {
          console.error("Error deleting account:", err);
          alert("Failed to delete account.");
        });
    }
  };

  const handleDeletePost = async (postId) => {
    console.log("Trying to delete post with ID:", postId);
    if (!window.confirm("Are you sure you want to delete this post?")) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setMyPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };
  

  return (
    <div className="account-container">
      <Header />

      <div className="profile-section">
        <h2>My Profile</h2>
        <img
  src={
    formData.profilePicture?.startsWith("blob:")
      ? formData.profilePicture
      : `http://localhost:5000/uploads/${formData.profilePicture || "default-profile.png"}`
  }
  alt="Profile"
  className="profile-image"
/>


        {editMode ? (
          <>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
            <textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <div className="profile-text">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Bio:</strong> {user.bio}
              </p>
            </div>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}

        <button className="delete-account-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      <div className="right-section">
        

        <div className="account-card full-width">
          <h3>Add Post</h3>
          <AddPost
            onPostAdded={(newPost) => setMyPosts((prev) => [newPost, ...prev])}
          />
        </div>

        <div className="account-card full-width">
          <h3>My Posts</h3>
          <div className="post-grid">
            {myPosts.map((p) => (
              <div key={p._id} className="post-card">
                <p className="post-meta">
                  <strong>{p.username}</strong> •{" "}
                  {new Date(p.createdAt).toLocaleString()}
                </p>
                <p>{p.content}</p>
                {p.image && (
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    alt="uploaded"
                    className="post-img"
                  />
                )}
                <div className="post-footer">
                  <button
                    className="delete-post-btn"
                    onClick={() => handleDeletePost(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
