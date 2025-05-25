import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScreenName } from '../App';
import { AppHeader } from '../common/AppHeader';
import { styles } from '../../styles/common';

interface VideoCallScreenProps {
  navigateTo: (screen: ScreenName) => void;
  currentScreen: ScreenName;
  isAuthenticated: boolean;
  handleLogout: () => void;
}

interface CallParticipant {
  id: string;
  name: string;
  role: 'doctor' | 'patient';
  isMuted: boolean;
  isVideoOff: boolean;
  isSpeaking: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export const VideoCallScreen: React.FC<VideoCallScreenProps> = ({
  navigateTo,
  currentScreen,
  isAuthenticated,
  handleLogout,
}) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [participants, setParticipants] = useState<CallParticipant[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'doctor',
      isMuted: false,
      isVideoOff: false,
      isSpeaking: true,
    },
    {
      id: '2',
      name: 'You',
      role: 'patient',
      isMuted: false,
      isVideoOff: false,
      isSpeaking: false,
    },
  ]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Dr. Sarah Johnson',
      content: 'Hello! How are you feeling today?',
      timestamp: new Date().toISOString(),
    },
  ]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate connecting to call
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setCallStatus('active');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    setParticipants(prev =>
      prev.map(p => (p.role === 'patient' ? { ...p, isMuted: !isMuted } : p))
    );
  };

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    setParticipants(prev =>
      prev.map(p => (p.role === 'patient' ? { ...p, isVideoOff: !isVideoOff } : p))
    );
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    // TODO: Implement actual call ending logic
    setTimeout(() => {
      navigateTo('mainTab');
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: '2',
      senderName: 'You',
      content: chatMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      style={{
        ...styles.pageContainer,
        padding: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AppHeader
        navigateTo={navigateTo}
        currentScreen={currentScreen}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <div style={{ flex: 1, display: 'flex', position: 'relative', backgroundColor: '#000' }}>
        {isConnecting ? (
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 style={{ marginBottom: '20px' }}>Connecting to call...</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            <div style={{ flex: 1, position: 'relative' }}>
              <video
                ref={remoteVideoRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                autoPlay
                playsInline
                muted={isMuted}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'white',
                  padding: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{participants.find(p => p.role === 'doctor')?.name}</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                    {callStatus === 'active' ? 'In Call' : 'Call Ended'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '5px 10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                      }}
                    >
                      {participant.isMuted && <span>🔇</span>}
                      {participant.isVideoOff && <span>📹</span>}
                      {participant.isSpeaking && (
                        <motion.div
                          style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#34C759',
                            borderRadius: '50%',
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '200px',
                  height: '150px',
                  backgroundColor: '#333',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <video
                  ref={localVideoRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scaleX(-1)',
                  }}
                  autoPlay
                  playsInline
                  muted
                />
              </div>
            </div>

            {isChatOpen && (
              <motion.div
                style={{
                  width: '300px',
                  backgroundColor: 'white',
                  borderLeft: '1px solid #eee',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
              >
                <div
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: 0 }}>Chat</h3>
                  <motion.button
                    onClick={() => setIsChatOpen(false)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
                </div>
                <div
                  ref={chatContainerRef}
                  style={{
                    flex: 1,
                    padding: '15px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        alignSelf: message.senderId === '2' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: message.senderId === '2' ? '#007AFF' : '#f0f0f0',
                          color: message.senderId === '2' ? 'white' : '#333',
                          padding: '8px 12px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                        }}
                      >
                        {message.content}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: '#666',
                          marginTop: '4px',
                          textAlign: message.senderId === '2' ? 'right' : 'left',
                        }}
                      >
                        {message.senderName} • {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSendMessage}
                  style={{
                    padding: '15px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      fontSize: '0.9rem',
                    }}
                  />
                  <motion.button
                    type="submit"
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#007AFF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!chatMessage.trim()}
                  >
                    Send
                  </motion.button>
                </form>
              </motion.div>
            )}
          </>
        )}
      </div>

      {!isConnecting && (
        <motion.div
          style={{
            padding: '20px',
            backgroundColor: 'white',
            borderTop: '1px solid #eee',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <motion.button
            onClick={handleToggleMute}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: isMuted ? '#FF3B30' : '#f0f0f0',
              color: isMuted ? 'white' : '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? '🔇' : '🎤'}
          </motion.button>
          <motion.button
            onClick={handleToggleVideo}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: isVideoOff ? '#FF3B30' : '#f0f0f0',
              color: isVideoOff ? 'white' : '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isVideoOff ? '📹' : '📷'}
          </motion.button>
          <motion.button
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: isChatOpen ? '#007AFF' : '#f0f0f0',
              color: isChatOpen ? 'white' : '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            💬
          </motion.button>
          <motion.button
            onClick={handleEndCall}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#FF3B30',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            📞
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}; 