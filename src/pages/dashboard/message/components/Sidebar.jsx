import React, { useState } from 'react';
import '../style/chat.css';
import '../style/messenger.css';
import '../style/sidebar.css';

function Sidebar({ users, onSelectUser, selectedUser, messages }) {
      const [searchQuery, setSearchQuery] = useState('');
      const [activeFilter, setActiveFilter] = useState('all');

      const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            messages[user.id]?.some(msg =>
                  msg.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
      );

      return (
            <div className="sidebar-container ">
                  <div className="message-header">
                        <h1 className="message-count">Messages ({users.length})</h1>
                        <div className="message-filters">
                              {['all', 'unread', 'groups', 'archived'].map(filter => (
                                    <button
                                          key={filter}
                                          className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                                          onClick={() => setActiveFilter(filter)}
                                    >
                                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                              ))}
                        </div>
                        <div className="search-container">
                              <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="search-bar"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                              />
                              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                              </svg>
                        </div>
                  </div>

                  <div className="chat-list mt-4">
                        {filteredUsers.map((user) => {
                              const userMessages = messages[user.id];
                              const lastMessage = userMessages ? userMessages[userMessages.length - 1] : null;
                              const isSelected = selectedUser.id === user.id;

                              return (
                                    <div
                                          key={user.id}
                                          className={`chat-item ${isSelected ? 'selected' : ''}`}
                                          onClick={() => onSelectUser(user)}
                                    >
                                          <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="avatar "
                                                style={{ width: 40, height: 40, borderRadius: '50%' }}
                                          />
                                          <div className="chat-item-content group">
                                                <div className="chat-item-header">
                                                      <span className="chat-name  group-hover:text-black ">{user.name}</span>
                                                      {lastMessage && (
                                                            <span className="chat-time">
                                                                  {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                  })}
                                                            </span>
                                                      )}
                                                </div>
                                                <div className="chat-preview">
                                                      {lastMessage ? lastMessage.content.split('\n')[0] : 'No messages yet'}
                                                </div>
                                          </div>
                                    </div>
                              );
                        })}
                  </div>
            </div>
      );
}

export default Sidebar;
