import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../../store';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaExpand, FaCompress } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SimplePeer from 'simple-peer';
import Webcam from 'react-webcam';

interface VideoCallProps {
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  onEndCall: () => void;
}

interface PeerConnection {
  peer: SimplePeer.Instance;
  stream: MediaStream;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  appointmentId,
  doctorId,
  doctorName,
  onEndCall,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<PeerConnection | null>(null);
  const [consultationNotes, setConsultationNotes] = useState('');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const user = useStore((state) => state.user);

  useEffect(() => {
    initializeCall();
    return () => {
      cleanupCall();
    };
  }, []);

  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isCallActive]);

  const initializeCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize peer connection
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (data) => {
        // In a real application, you would send this signal data to the other peer
        // through your signaling server (e.g., WebSocket)
        console.log('Signal data:', data);
      });

      peer.on('connect', () => {
        console.log('Peer connection established');
        setIsConnecting(false);
        setIsCallActive(true);
        toast.success('Connected to doctor');
      });

      peer.on('stream', (stream) => {
        setRemoteStream(stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      });

      peer.on('error', (err) => {
        console.error('Peer connection error:', err);
        toast.error('Connection error. Please try again.');
        cleanupCall();
      });

      setPeerConnection({ peer, stream });

    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast.error('Failed to access camera and microphone');
      onEndCall();
    }
  };

  const cleanupCall = () => {
    if (peerConnection) {
      peerConnection.peer.destroy();
      peerConnection.stream.getTracks().forEach((track) => track.stop());
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsCallActive(false);
    setCallDuration(0);
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    cleanupCall();
    onEndCall();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden"
    >
      {/* Remote Video (Doctor) */}
      <div className="absolute inset-0">
        {remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            {isConnecting ? (
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Connecting to doctor...</p>
              </div>
            ) : (
              <div className="text-white text-center">
                <p className="text-2xl font-semibold mb-2">Dr. {doctorName}</p>
                <p className="text-gray-400">Waiting for connection...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Local Video (Patient) */}
      <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden shadow-lg">
        {localStream ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={{
              width: 192,
              height: 144,
              facingMode: 'user',
            }}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="text-white">
            <p className="font-medium">Dr. {doctorName}</p>
            <p className="text-sm text-gray-300">
              {isCallActive ? formatDuration(callDuration) : 'Connecting...'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className={`p-3 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              } text-white`}
            >
              {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-700'
              } text-white`}
            >
              {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="p-3 rounded-full bg-gray-700 text-white"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEndCall}
              className="p-3 rounded-full bg-red-500 text-white"
            >
              <FaPhoneSlash />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Consultation Notes */}
      <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Consultation Notes</h3>
        <textarea
          value={consultationNotes}
          onChange={(e) => setConsultationNotes(e.target.value)}
          placeholder="Add notes during the consultation..."
          className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}; 