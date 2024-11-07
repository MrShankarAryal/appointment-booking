import React, { useState, useEffect } from 'react';
import { getAvailableSlots, bookAppointment } from '../utils/api';
import { addToGoogleCalendar } from '../utils/googleCalendar';
import Notifications from './Notifications';
import AppointmentForm from './AppointmentForm';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const slots = await getAvailableSlots(selectedDate);
      setAvailableSlots(slots);
    };
    fetchAvailableSlots();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async (formData) => {
    try {
      await bookAppointment(formData);
      await addToGoogleCalendar(formData);
      setShowNotification(true);
      // Redirect user or display success message
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <AppointmentForm
        selectedDate={selectedDate}
        availableSlots={availableSlots}
        selectedSlot={selectedSlot}
        onDateChange={handleDateChange}
        onSlotSelect={handleSlotSelect}
        onSubmit={handleSubmit}
      />
      {showNotification && (
        <Notifications
          message="Appointment booked successfully!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default AppointmentBooking;