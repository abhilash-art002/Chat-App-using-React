import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbox.css';
import assets from '../../assets/assets';
import { useRef } from 'react';


const Chatbox = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [user, setUser] = useState(null);

  const endRef = useRef(null);
  useEffect(() => {
  endRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && selectedUser) {
      fetchMessages(user.id, selectedUser.id);
    }
  }, [user, selectedUser]);

  const fetchMessages = async (sender_id, receiver_id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${sender_id}/${receiver_id}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  const handleSend = async () => {
    if (!messageInput.trim() || !user || !selectedUser) return;

    try {
      await axios.post('http://localhost:5000/api/messages/send', {
        sender_id: user.id,
        receiver_id: selectedUser.id,
        content: messageInput
      });
      setMessageInput("");
      fetchMessages(user.id, selectedUser.id);
    } catch (err) {
      console.error("Sending failed", err);
    }
  };

  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img
  src={selectedUser?.profile_image
    ? `http://localhost:5000/uploads/${selectedUser.profile_image}`
    : assets.profile_img}
  alt="user"
/>

        <p>{selectedUser?.username || "Select a user"} <img className="dot" src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>

     <div className="chat-msg" >
  {Object.entries(
    messages.reduce((acc, msg) => {
      const date = new Date(msg.created_at).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {})
  ).map(([date, msgs], i) => (
    <div key={i}>
      <div className="msg-date">
        <span>{date}</span>
      </div>
      {msgs.map((msg, idx) => (
        <div key={idx} className={msg.sender_id === user?.id ? "s-msg" : "r-msg"}>
          <p className="msg">{msg.message}</p>
          <div>
            {/* <img
              src={
                user?.profile_image
                  ? `http://localhost:5000/uploads/${user.profile_image}`
                  : assets.profile_img
              }
              alt="user"
            /> */}
            <img
  src={
    msg.profile_image
      ? `http://localhost:5000/uploads/${msg.profile_image}`
      : assets.profile_img
  }
  alt="sender"
/>

            <p>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      ))}
    </div>
  ))}
  <div ref={endRef}></div>
</div>




      <div className="chat-input">
        <input
          type="text"
          placeholder='Send a message'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <input type="file" id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" onClick={handleSend} />
      </div>
    </div>
  );
};


export default Chatbox;
