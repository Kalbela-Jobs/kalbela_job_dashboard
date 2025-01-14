import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../style/chat.css';
import '../style/messenger.css';
import '../style/sidebar.css';

function MessageInput({ onSendMessage }) {
      const [message, setMessage] = useState('');
      const [showEmoji, setShowEmoji] = useState(false);
      const [attachments, setAttachments] = useState([]);
      const [isRecording, setIsRecording] = useState(false);
      const [recordingTime, setRecordingTime] = useState(0);
      const [audioBlob, setAudioBlob] = useState(null);
      const fileInputRef = useRef(null);
      const recordingInterval = useRef(null);
      const mediaRecorderRef = useRef(null);

      useEffect(() => {
            return () => {
                  if (recordingInterval.current) {
                        clearInterval(recordingInterval.current);
                  }
            };
      }, []);

      const handleSend = () => {
            if (message.trim() || attachments.length > 0 || audioBlob) {
                  onSendMessage({
                        text: message,
                        attachments: attachments,
                        audio: audioBlob
                  });
                  setMessage('');
                  setAttachments([]);
                  setAudioBlob(null);
            }
      };

      const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                  if (e.shiftKey) {
                        return; // Allow new line with Shift+Enter
                  }
                  e.preventDefault();
                  handleSend();
            }
      };

      const startRecording = async () => {
            try {
                  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                  const mediaRecorder = new MediaRecorder(stream);
                  mediaRecorderRef.current = mediaRecorder;
                  const audioChunks = [];

                  mediaRecorder.ondataavailable = (event) => {
                        audioChunks.push(event.data);
                  };

                  mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                        setAudioBlob(audioBlob);
                  };

                  mediaRecorder.start();
                  setIsRecording(true);
                  setRecordingTime(0);
                  recordingInterval.current = setInterval(() => {
                        setRecordingTime(prev => prev + 1);
                  }, 1000);
            } catch (error) {
                  console.error('Error accessing microphone:', error);
            }
      };

      const stopRecording = () => {
            if (mediaRecorderRef.current) {
                  mediaRecorderRef.current.stop();
                  mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
            setIsRecording(false);
            clearInterval(recordingInterval.current);
      };

      const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
      };

      const handleFileChange = (e) => {
            const files = Array.from(e.target.files || []);
            const newAttachments = files.map(file => ({
                  id: Math.random().toString(),
                  file,
                  preview: URL.createObjectURL(file)
            }));
            setAttachments(prev => [...prev, ...newAttachments]);
      };

      const removeAttachment = (id) => {
            setAttachments(prev => prev.filter(att => att.id !== id));
      };

      return (
            <div className="message-input-container">
                  {attachments.length > 0 && (
                        <div className="attachment-preview">
                              {attachments.map(att => (
                                    <div key={att.id} className="preview-item">
                                          <img src={att.preview} alt="attachment" />
                                          <button
                                                className="remove-attachment"
                                                onClick={() => removeAttachment(att.id)}
                                          >
                                                ×
                                          </button>
                                    </div>
                              ))}
                        </div>
                  )}

                  {audioBlob && (
                        <div className="audio-preview">
                              <audio controls src={URL.createObjectURL(audioBlob)} />
                              <button onClick={() => setAudioBlob(null)}>Remove</button>
                        </div>
                  )}

                  {isRecording ? (
                        <div className="voice-recording">
                              <button className="action-button" onClick={stopRecording}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <rect x="6" y="6" width="12" height="12" />
                                    </svg>
                              </button>
                              <div className="recording-wave">
                                    {[...Array(20)].map((_, i) => (
                                          <div
                                                key={i}
                                                className="wave-bar"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                          />
                                    ))}
                              </div>
                              <span className="voice-recording-time">{formatTime(recordingTime)}</span>
                        </div>
                  ) : (
                        <div className="message-input-wrapper">
                              <div className="message-actions">
                                    <button
                                          className="action-button"
                                          onClick={() => fileInputRef.current?.click()}
                                    >
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                          </svg>
                                    </button>
                                    <input
                                          type="file"
                                          ref={fileInputRef}
                                          onChange={handleFileChange}
                                          multiple
                                          accept="image/*"
                                          style={{ display: 'none' }}
                                    />
                                    <button
                                          className="action-button"
                                          onClick={() => setShowEmoji(!showEmoji)}
                                    >
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                                <line x1="15" y1="9" x2="15.01" y2="9" />
                                          </svg>
                                    </button>
                              </div>

                              <textarea
                                    className="message-input"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    rows={1}
                              />

                              <div className="message-actions">
                                    <button
                                          className="action-button"
                                          onClick={startRecording}
                                    >
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                <line x1="12" y1="19" x2="12" y2="23" />
                                                <line x1="8" y1="23" x2="16" y2="23" />
                                          </svg>
                                    </button>
                                    <button
                                          className="action-button primary"
                                          onClick={handleSend}
                                    >
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="22" y1="2" x2="11" y2="13" />
                                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                          </svg>
                                    </button>
                              </div>
                        </div>
                  )}

                  {showEmoji && (
                        <div className="emoji-picker-container">
                              <EmojiPicker
                                    onEmojiClick={(emojiObject) => {
                                          setMessage(prev => prev + emojiObject.emoji);
                                    }}
                                    disableAutoFocus
                                    native
                              />
                        </div>
                  )}
            </div>
      );
}

export default MessageInput;
