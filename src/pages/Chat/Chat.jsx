import React, { useState } from 'react';
import './Chat.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import Chatbox from '../../components/Chatbox/Chatbox';
import RightSidebar from '../../components/RightSidebar/RightSidebar';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSidebar onSelectUser={setSelectedUser} />
        <Chatbox selectedUser={selectedUser} />
        <RightSidebar selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Chat;
