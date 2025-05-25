import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ScreenName } from '../App';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  rating: number;
  totalRatings: number;
  lastConsultation?: string;
}

interface DoctorRatingScreenProps {
  navigateTo: (screen: ScreenName) => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
  currentScreen: ScreenName;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    totalRatings: 124,
    lastConsultation: '2024-03-15'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    totalRatings: 89,
    lastConsultation: '2024-03-10'
  },
  {
    id: '3',
    name: 'Dr. Emily Brown',
    specialization: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    totalRatings: 156,
    lastConsultation: '2024-03-18'
  }
];

export const DoctorRatingScreen: React.FC<DoctorRatingScreenProps> = ({
  navigateTo,
  isAuthenticated,
  handleLogout,
  currentScreen
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleRatingClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setRating(0);
    setReview('');
    setIsModalOpen(true);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    // Here you would typically make an API call to save the rating
    toast.success(`Thank you for rating Dr. ${selectedDoctor?.name}!`);
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setRating(0);
    setReview('');
  };

  const renderStars = (currentRating: number, isInteractive: boolean = false) => {
    return [...Array(5)].map((_, index) => {
      const ratingValue = index + 1;
      const isHovered = isInteractive && hoveredRating >= ratingValue;
      const isSelected = isInteractive ? rating >= ratingValue : currentRating >= ratingValue;

      return (
        <motion.button
          key={index}
          type={isInteractive ? 'button' : undefined}
          className={`text-2xl transition-colors duration-200 ${
            isInteractive ? 'cursor-pointer' : 'cursor-default'
          } ${isSelected || isHovered ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={() => isInteractive && setRating(ratingValue)}
          onMouseEnter={() => isInteractive && setHoveredRating(ratingValue)}
          onMouseLeave={() => isInteractive && setHoveredRating(0)}
          whileHover={isInteractive ? { scale: 1.1 } : {}}
          whileTap={isInteractive ? { scale: 0.95 } : {}}
        >
          <FaStar />
        </motion.button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Rate Your Doctors</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-48">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-sm opacity-90">{doctor.specialization}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(doctor.rating)}
                    <span className="text-sm text-gray-600 ml-2">
                      ({doctor.totalRatings})
                    </span>
                  </div>
                  {doctor.lastConsultation && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      {new Date(doctor.lastConsultation).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleRatingClick(doctor)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <FaUserMd />
                  <span>Rate Doctor</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Rate Dr. {selectedDoctor.name}
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-1">
                  {renderStars(rating, true)}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review (Optional)
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience with this doctor..."
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRating}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Submit Rating
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 