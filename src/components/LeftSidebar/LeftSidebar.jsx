import React, { useEffect, useState } from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LeftSidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 NEW STATE
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/users") // backend route we’ll add below
      .then(res => setUsers(res.data.filter(u => u.id !== currentUser.id))) // exclude self
      .catch(err => console.log(err));
  }, [currentUser?.id]);
   // 🔍 Filter users by searchTerm
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className='logo' alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate('/profile')} >Edit profile</p>
              <hr />
              <p onClick={() => {
                localStorage.removeItem("user");
                navigate('/');
              }}>Logout</p>
            </div>
          </div>
        </div>

        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder='Search here' value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 🔹 Update state
          />
        </div>
      </div>

      <div className="ls-list">
        {filteredUsers.map(user => (
          <div className="friends" key={user.id} onClick={() => onSelectUser(user)}>
            <img
  src={user?.profile_image ? `http://localhost:5000/uploads/${user.profile_image}` : assets.profile_img}
  alt="user"
/>

            <div>
              <p>{user.username}</p>
              <span>Click to chat</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
