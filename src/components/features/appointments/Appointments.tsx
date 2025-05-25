import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../../store';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';
import { FaCalendarAlt, FaVideo, FaUserMd, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<'upcoming' | 'past'>('upcoming');
  const appointments = useStore((state) => state.user?.appointments || []);
  const addAppointment = useStore((state) => state.addAppointment);

  const filteredAppointments = appointments.filter((apt) => {
    const appointmentDate = parseISO(apt.date);
    const isUpcoming = isAfter(appointmentDate, new Date());
    return selectedView === 'upcoming' ? isUpcoming : !isUpcoming;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = parseISO(a.date);
    const dateB = parseISO(b.date);
    return selectedView === 'upcoming'
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleViewChange = (view: 'upcoming' | 'past') => {
    setSelectedView(view);
  };

  const handleScheduleAppointment = () => {
    // This would typically open a modal or navigate to a scheduling page
    // For now, we'll just add a dummy appointment
    const newAppointment = {
      id: Date.now().toString(),
      doctorId: 'doc123',
      doctorName: 'Dr. Smith',
      date: addDays(new Date(), 7).toISOString(),
      time: '10:00 AM',
      type: 'video' as const,
      status: 'scheduled' as const,
    };

    addAppointment(newAppointment);
    toast.success('Appointment scheduled successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleScheduleAppointment}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Schedule New Appointment
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleViewChange('upcoming')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedView === 'upcoming'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => handleViewChange('past')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedView === 'past'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Past
        </button>
      </div>

      {sortedAppointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-lg"
        >
          <FaCalendarAlt className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments</h3>
          <p className="text-gray-500">
            {selectedView === 'upcoming'
              ? "You don't have any upcoming appointments."
              : "You don't have any past appointments."}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {sortedAppointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FaUserMd className="text-blue-500" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      {appointment.doctorName}
                    </h3>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{format(parseISO(appointment.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {appointment.type === 'video' ? (
                        <FaVideo className="text-gray-400" />
                      ) : (
                        <FaMapMarkerAlt className="text-gray-400" />
                      )}
                      <span className="capitalize">{appointment.type} Consultation</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : appointment.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>

                  {appointment.status === 'scheduled' && appointment.type === 'video' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Navigate to video consultation
                        window.location.href = `/video-consultation/${appointment.id}`;
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Join Call
                    </motion.button>
                  )}

                  {appointment.status === 'scheduled' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Cancel appointment logic
                        toast.info('Appointment cancellation feature coming soon!');
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </div>

              {appointment.notes && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                  <p className="text-gray-600">{appointment.notes}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}; 