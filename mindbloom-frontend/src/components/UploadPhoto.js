import React, { useState } from "react";

const UploadPhoto = () => {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="section">
      <h2>Upload Profile Picture</h2>
      <input type="file" onChange={handleUpload} />
      {image && <img src={image} alt="profile preview" />}
    </div>
  );
};

export default UploadPhoto;
