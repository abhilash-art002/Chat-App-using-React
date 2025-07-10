import React, { useState, useEffect } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import axios from 'axios';

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("username", name || user.username); // fallback to old name
    formData.append("bio", bio || user.bio || "");
    formData.append("profile_image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/users/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const updatedUser = {
      ...user,
      username: name || user.username,
      bio: bio || user.bio || "",
      profile_image: res.data.imageUrl || user.profile_image
    };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated!");

    } catch (err) {
      console.error("Profile update failed", err);
    }
  };
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsed = JSON.parse(storedUser);
    setUser(parsed);
    setName(parsed.username || "");
    setBio(parsed.bio || "");
  }
}, []);


  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          <h3>Profile Details</h3>

          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            <img src={preview || (user?.profile_image ? `http://localhost:5000/uploads/${user.profile_image}` : assets.avatar_icon)} alt="" />
            Upload Profile Image
          </label>

          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea placeholder="Write profile bio" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>

          <button type="submit">Save</button>
        </form>

        <img
          className='profile-pic'
          src={preview || (user?.profile_image ? `http://localhost:5000/uploads/${user.profile_image}` : assets.logo_icon)}
          alt="preview"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
