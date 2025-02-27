import React, { useRef, useEffect, useState, useContext } from 'react';
import MessageInput from './MessageInput';
import '../style/chat.css';
import '../style/messenger.css';
import '../style/sidebar.css';
import { Pause, Play } from 'lucide-react';
import { ReloadOutlined } from '@ant-design/icons';
import { Kalbela_AuthProvider } from '../../../../context/MainContext';
import { Avatar, Image } from 'antd';

function ChatArea({ messages, selectedUser, onSendMessage, candidate, refetch, isLoading }) {

      const { user } = useContext(Kalbela_AuthProvider);
      const messagesEndRef = useRef(null);

      useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

      const getInitials = (name) => {
            return name?.split(' ')
                  ?.map(word => word[0])
                  ?.join('')
                  ?.toUpperCase();
      };

      return (
            <div className="message-area h-screen">
                  <div className="community-header">
                        <div className="community-info">
                              {candidate?.fullName ? (
                                    <Avatar
                                          src={candidate.profile_picture || undefined} // Ensures fallback works properly
                                          alt={candidate.fullName}
                                          className="avatar"
                                          style={{ width: 50, height: 50, borderRadius: "10%" }}
                                    >
                                          {!candidate.profile_picture && candidate.fullName?.charAt(0)} {/* Show first letter if no image */}
                                    </Avatar>
                              ) : (
                                    <div className="community-avatar ">
                                          {getInitials(selectedUser?.name)}
                                    </div>
                              )}
                              <div className="community-details text-white">
                                    <h2>{candidate?.fullName}</h2>
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
                              <button onClick={() => refetch()} className="text-gray-400 text-xl">
                                    <ReloadOutlined className={isLoading ? 'animate-spin' : ''} />
                              </button>

                        </div>
                  </div>

                  <div className="messages-container h-20 overflow-y-auto">
                        {Array.isArray(messages) && messages?.map((message) => {
                              const hasHTML = /<\/?[a-z][\s\S]*>/i.test(message.content);
                              return (<div
                                    key={message._id}
                                    className={`message-bubble ${message.sender === user?._id ? 'sent' : 'received'}`}
                              >
                                    {hasHTML ? (
                                          <span dangerouslySetInnerHTML={{ __html: message.content }} />
                                    ) : (
                                          <span>{message.content}</span>
                                    )}
                                    {message.attachments?.map((att, i) => (
                                          <div>
                                                <Image
                                                      key={i}
                                                      src={att}
                                                      alt="attachment"
                                                      style={{
                                                            maxWidth: '200px',
                                                            borderRadius: '8px',
                                                            marginTop: '8px'
                                                      }}
                                                />
                                          </div>
                                    ))}
                                    {message.audio && (
                                          <AudioPlayer audioUrl={message.audio} />
                                    )}
                                    <div className="message-status mt-0.5">
                                          <div >
                                                <span className='whitespace-nowrap'> {new Date(message.timestamp).toLocaleTimeString([], {
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                      hour12: true
                                                })}</span>

                                          </div>

                                          {message.sender === user._id && (
                                                <div className='flex items-center gap-1'>

                                                      <span>Sent</span>
                                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M20 6L9 17l-5-5" />
                                                      </svg>
                                                </div>
                                          )}
                                    </div>
                              </div>)
                        }
                        )}
                        <div ref={messagesEndRef} />
                  </div>

                  <MessageInput onSendMessage={onSendMessage} />
            </div>
      );
}

export default ChatArea;




// const AudioPlayer = ({ audioUrl }) => {
//       const audioRef = useRef(null);
//       const [isPlaying, setIsPlaying] = useState(false);
//       const [currentTime, setCurrentTime] = useState(0);
//       const [duration, setDuration] = useState(0);
//       const [isMuted, setIsMuted] = useState(false);

//       // Play/Pause toggle
//       const togglePlayPause = () => {
//             if (isPlaying) {
//                   audioRef.current.pause();
//             } else {
//                   audioRef.current.play();
//             }
//             setIsPlaying(!isPlaying);
//       };

//       // Update current time and duration
//       const updateTime = () => {
//             setCurrentTime(audioRef.current.currentTime);
//             setDuration(audioRef.current.duration);
//       };

//       // Seek audio
//       const handleSeek = (e) => {
//             audioRef.current.currentTime = e.target.value;
//             setCurrentTime(e.target.value);
//       };

//       // Toggle mute
//       const toggleMute = () => {
//             audioRef.current.muted = !isMuted;
//             setIsMuted(!isMuted);
//       };

//       // Format time (e.g., 00:00)
//       const formatTime = (time) => {
//             const minutes = Math.floor(time / 60);
//             const seconds = Math.floor(time % 60);
//             return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//       };

//       return (
//             <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
//                   {/* Audio Element */}
//                   <audio
//                         ref={audioRef}
//                         src={audioUrl}
//                         onTimeUpdate={updateTime}
//                         onLoadedMetadata={() => setDuration(audioRef.current.duration)}
//                   />

//                   {/* Play/Pause Button */}
//                   <button
//                         onClick={togglePlayPause}
//                         className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
//                   >
//                         {isPlaying ? 'Pause' : 'Play'}
//                   </button>

//                   {/* Seek Bar */}
//                   <input
//                         type="range"
//                         value={currentTime}
//                         max={duration || 0}
//                         onChange={handleSeek}
//                         className="w-full mt-2"
//                   />

//                   {/* Time Display */}
//                   <div className="flex justify-between w-full text-sm text-gray-600 mt-1">
//                         <span>{formatTime(currentTime)}</span>
//                         <span>{formatTime(duration)}</span>
//                   </div>

//                   {/* Mute Button and Volume Control */}
//                   <div className="flex items-center gap-2 mt-2">
//                         <button
//                               onClick={toggleMute}
//                               className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none"
//                         >
//                               {isMuted ? 'Unmute' : 'Mute'}
//                         </button>
//                         <input
//                               type="range"
//                               min="0"
//                               max="1"
//                               step="0.1"
//                               defaultValue="1"
//                               onChange={(e) => (audioRef.current.volume = e.target.value)}
//                               className="w-24"
//                         />
//                   </div>
//             </div>
//       );
// };

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

            animationRef.current = requestAnimationFrame(drawWaveform)
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

                  <span className="text-sm text-white min-w-[48px]">{formatTime(currentTime)}</span>

                  <audio
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        src={audioUrl}
                  />
            </div>
      )
}
