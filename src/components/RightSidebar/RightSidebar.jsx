import React, { useEffect, useState } from 'react';
import './RightSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom'; // ✅ for navigation

const RightSidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ for redirection

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
    const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ clear user session
    navigate('/'); // ✅ go to main/login page (adjust path if needed)
  };

  return (
    <div className='rs'>
      <div className="rs-profile">
        <img
  src={user?.profile_image ? `http://localhost:5000/uploads/${user.profile_image}` : assets.profile_img}
  alt="user"
/>

        <h3>{user?.username || "Guest"} <img src={assets.green_dot} alt="" className='dot' /></h3>
        <p>{user?.bio || `Hey, I'm ${user?.username || "a new user"} using the chat app!`}</p>

      </div>

      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RightSidebar;
