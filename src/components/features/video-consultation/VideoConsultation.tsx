import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../../store';
import { toast } from 'react-toastify';
import { FaVideo, FaMicrophone, FaPhone, FaUserMd, FaUser } from 'react-icons/fa';
import Peer from 'simple-peer';
import Webcam from 'react-webcam';

interface VideoConsultationProps {
  appointmentId: string;
  doctorId: string;
  doctorName: string;
}

export const VideoConsultation: React.FC<VideoConsultationProps> = ({
  appointmentId,
  doctorId,
  doctorName,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const user = useStore((state) => state.user);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Initialize peer connection
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peerRef.current = peer;

        peer.on('signal', (data) => {
          // Send this signal data to the doctor through your signaling server
          // This is where you'd implement your signaling logic
          console.log('Sending signal data:', data);
        });

        peer.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });

        peer.on('connect', () => {
          setIsConnected(true);
          setIsLoading(false);
          toast.success('Connected to doctor');
        });

        peer.on('error', (err) => {
          console.error('Peer connection error:', err);
          toast.error('Connection error. Please try again.');
          endCall();
        });

        // Cleanup function
        return () => {
          stream.getTracks().forEach((track) => track.stop());
          if (peerRef.current) {
            peerRef.current.destroy();
          }
        };
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Failed to access camera and microphone');
        setIsLoading(false);
      }
    };

    initializeCall();
  }, [appointmentId, doctorId]);

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    setIsCallEnded(true);
    setIsConnected(false);
    toast.info('Call ended');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to doctor...</p>
        </div>
      </div>
    );
  }

  if (isCallEnded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gray-100"
      >
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <FaPhone className="text-4xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Call Ended</h2>
          <p className="text-gray-600 mb-4">Thank you for using our video consultation service.</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Video Consultation</h1>
            <p className="text-gray-400">
              with Dr. {doctorName} {isConnected && '(Connected)'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaUserMd className="text-blue-400" />
              <span className="text-sm text-gray-400">Doctor</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-green-400" />
              <span className="text-sm text-gray-400">{user?.name}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Remote Video (Doctor) */}
          <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {!isConnected && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Waiting for doctor to join...</p>
                </div>
              </div>
            )}
          </div>

          {/* Local Video (Patient) */}
          <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className={`p-3 rounded-full ${
                  isMuted ? 'bg-red-500' : 'bg-gray-700'
                } hover:bg-opacity-80 transition-colors`}
              >
                <FaMicrophone className={isMuted ? 'text-white' : 'text-white'} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOff ? 'bg-red-500' : 'bg-gray-700'
                } hover:bg-opacity-80 transition-colors`}
              >
                <FaVideo className={isVideoOff ? 'text-white' : 'text-white'} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={endCall}
                className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              >
                <FaPhone className="text-white transform rotate-135" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Consultation Notes</h2>
          <textarea
            className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add notes about the consultation..."
          />
        </div>
      </div>
    </div>
  );
}; 