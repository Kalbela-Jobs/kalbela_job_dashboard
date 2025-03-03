import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../style/chat.css';
import '../style/messenger.css';
import '../style/sidebar.css';
import { Pause, Play, Send, Trash } from 'lucide-react';


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

      const emojiPickerRef = useRef(null); // Reference for the emoji picker container
      const emojiButtonRef = useRef(null); // Reference for the emoji button

      // Close emoji picker when clicking outside
      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (
                        emojiPickerRef.current &&
                        !emojiPickerRef.current.contains(event.target) &&
                        emojiButtonRef.current &&
                        !emojiButtonRef.current.contains(event.target)
                  ) {
                        setShowEmoji(false);
                  }
            };

            document.addEventListener('mousedown', handleClickOutside); // Listen for click events

            return () => {
                  document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener
            };
      }, []);

      const handleSend = () => {
            if (message.trim() || attachments.length > 0 || audioBlob) {
                  console.log('Sending message:', message, attachments, audioBlob);
                  onSendMessage({
                        text: message,
                        attachments: attachments,
                        audio: audioBlob,
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
                        setRecordingTime((prev) => prev + 1);
                  }, 1000);
            } catch (error) {
                  console.error('Error accessing microphone:', error);
            }
      };

      const stopRecording = () => {
            if (mediaRecorderRef.current) {
                  mediaRecorderRef.current.stop();
                  mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
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
            const newAttachments = files.map((file) => ({
                  id: Math.random().toString(),
                  file,
                  preview: URL.createObjectURL(file),
            }));
            setAttachments((prev) => [...prev, ...newAttachments]);
      };

      const removeAttachment = (id) => {
            setAttachments((prev) => prev.filter((att) => att.id !== id));
      };

      const toggleEmojiPicker = () => {
            setShowEmoji((prev) => !prev);
      };

      return (
            <div className="message-input-container relative">
                  {attachments.length > 0 && (
                        <div className="attachment-preview">
                              {attachments.map((att) => (
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
                        <div className="audio-preview flex gap-2 items-center">
                              {/* <audio controls src={URL.createObjectURL(audioBlob)} /> */}
                              <AudioPlayer audioUrl={URL.createObjectURL(audioBlob)} />
                              <button onClick={() => setAudioBlob(null)}><Trash className='text-gray-300' /></button>
                        </div>
                  )}

                  {isRecording ? (
                        <div className="voice-recording">
                              <button className="action-button" onClick={stopRecording}>
                                    <Play />
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
                                          ref={emojiButtonRef} // Assign ref to emoji button
                                          className="action-button"
                                          onClick={toggleEmojiPicker}
                                    >
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                                <line x1="15" y1="9" x2="15.01" y2="9" />
                                          </svg>
                                    </button>

                                    {showEmoji && (
                                          <div className="absolute bottom-12 left-20 z-10" ref={emojiPickerRef}>
                                                <EmojiPicker
                                                      onEmojiClick={(emojiObject) => {
                                                            setMessage((prev) => prev + emojiObject.emoji);
                                                      }}
                                                      disableAutoFocus
                                                      native
                                                />
                                          </div>
                                    )}
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
                                    <button className="action-button" onClick={startRecording}>
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                                <line x1="12" y1="19" x2="12" y2="23" />
                                                <line x1="8" y1="23" x2="16" y2="23" />
                                          </svg>
                                    </button>
                                    <button
                                          className="text-blue-500 !text-xs hover:text-blue-600 bg-gray-600 hover:bg-gray-700 size-8 flex justify-center items-center rounded-full transition-colors"
                                          onClick={handleSend}
                                    >
                                          <Send className='!text-xs' />
                                    </button>
                              </div>
                        </div>
                  )}
            </div>
      );
}

export default MessageInput;


const AudioPlayer = ({ audioUrl }) => {
      const audioRef = useRef(null)
      const canvasRef = useRef(null)
      const [isPlaying, setIsPlaying] = useState(false)
      const [currentTime, setCurrentTime] = useState(0)
      const [duration, setDuration] = useState(0)
      const animationRef = useRef()

      // Format time as mm:ss
      const formatTime = (time) => {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            return `${minutes}:${seconds.toString().padStart(2, "0")}`
      }

      // Toggle play/pause
      const togglePlayPause = () => {
            if (!audioRef.current) return

            if (isPlaying) {
                  audioRef.current.pause()
                  cancelAnimationFrame(animationRef.current)
            } else {
                  audioRef.current.play()
                  animationRef.current = requestAnimationFrame(drawWaveform)
            }
            setIsPlaying(!isPlaying)
      }

      // Draw waveform visualization
      const drawWaveform = () => {
            if (!audioRef.current || !canvasRef.current) return

            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            const audio = audioRef.current

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw waveform bars
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
            const barWidth = 3
            const barGap = 2
            const barCount = Math.floor(canvas.width / (barWidth + barGap))

            for (let i = 0; i < barCount; i++) {
                  // Generate random heights for demo - in real app would use audio analysis
                  const height = Math.random() * (canvas.height * 0.8) + canvas.height * 0.2
                  const x = i * (barWidth + barGap)
                  const y = (canvas.height - height) / 2

                  ctx.fillRect(x, y, barWidth, height)
            }

            if (!audio.ended) {
                  animationRef.current = requestAnimationFrame(drawWaveform)
            } else {
                  setIsPlaying(false)
            }
      }

      // Update time display
      const handleTimeUpdate = () => {
            if (!audioRef.current) return
            setCurrentTime(audioRef.current.currentTime)
      }

      // Set initial duration
      const handleLoadedMetadata = () => {
            if (!audioRef.current) return
            setDuration(audioRef.current.duration)
      }

      // Handle audio end
      const handleEnded = () => {
            setIsPlaying(false)
            cancelAnimationFrame(animationRef.current)
      }

      // Cleanup animation on unmount
      useEffect(() => {
            return () => {
                  if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current)
                  }
            }
      }, [])

      return (
            <div className="flex items-center gap-4 px-4 py-2 bg-blue-600 rounded-lg w-fit">
                  <button
                        onClick={togglePlayPause}
                        className="text-white hover:text-white/80 transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                  >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>

                  <div className="relative w-40 h-8">
                        <canvas ref={canvasRef} width={160} height={32} className="absolute inset-0" />
                  </div>

                  <span className="text-sm text-white min-w-[48px]">
                        {isPlaying ? formatTime(currentTime) : formatTime(duration)}
                  </span>

                  <audio
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleEnded}
                        src={audioUrl}
                  />
            </div>
      )
}
