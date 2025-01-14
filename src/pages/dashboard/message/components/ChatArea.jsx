import React, { useRef, useEffect } from 'react';
import MessageInput from './MessageInput';
import '../style/chat.css';
import '../style/messenger.css';
import '../style/sidebar.css';

function ChatArea({ messages, selectedUser, onSendMessage }) {
      const messagesEndRef = useRef(null);

      useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

      const getInitials = (name) => {
            return name
                  .split(' ')
                  .map(word => word[0])
                  .join('')
                  .toUpperCase();
      };

      return (
            <div className="message-area">
                  <div className="community-header">
                        <div className="community-info">
                              {selectedUser.avatar ? (
                                    <img
                                          src={selectedUser.avatar}
                                          alt={selectedUser.name}
                                          className="community-avatar"
                                          style={{ objectFit: 'cover' }}
                                    />
                              ) : (
                                    <div className="community-avatar">
                                          {getInitials(selectedUser.name)}
                                    </div>
                              )}
                              <div className="community-details">
                                    <h2>{selectedUser.name}</h2>
                                    <div className="community-status">
                                          Active now
                                    </div>
                              </div>
                        </div>
                        <div className="community-actions">
                              <button className="action-button">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <path d="M23 7l-7 5 7 5V7z" />
                                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                    </svg>
                              </button>
                              <button className="action-button">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                              </button>
                              <button className="action-button">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                                    </svg>
                              </button>
                        </div>
                  </div>

                  <div className="messages-container">
                        {messages.map((message) => (
                              <div
                                    key={message.id}
                                    className={`message-bubble ${message.sender === 'me' ? 'sent' : 'received'}`}
                              >
                                    {message.content}
                                    {message.attachments?.map((att, i) => (
                                          <img
                                                key={i}
                                                src={att.preview}
                                                alt="attachment"
                                                style={{
                                                      maxWidth: '200px',
                                                      borderRadius: '8px',
                                                      marginTop: '8px'
                                                }}
                                          />
                                    ))}
                                    {message.sender === 'me' && (
                                          <div className="message-status">
                                                <span>Sent</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                      <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                          </div>
                                    )}
                              </div>
                        ))}
                        <div ref={messagesEndRef} />
                  </div>

                  <MessageInput onSendMessage={onSendMessage} />
            </div>
      );
}

export default ChatArea;
