import React, { useState } from "react";

const EditProfile = () => {
  const [name, setName] = useState("Riddhi Shah");
  const [bio, setBio] = useState("Empowering minds 🌱");

  const handleSave = () => {
    alert("Profile updated!");
  };

  return (
    <div className="section">
      <h2>Edit Profile</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditProfile;
