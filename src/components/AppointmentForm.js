import React, { useState } from 'react';
import { format } from 'date-fns';

const AppointmentForm = ({
  selectedDate,
  availableSlots,
  selectedSlot,
  onDateChange,
  onSlotSelect,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: format(selectedDate, 'yyyy-MM-dd'),
      slot: selectedSlot
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="date" className="block font-medium mb-2">
          Select a Date
        </label>
        <input
          type="date"
          id="date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => onDateChange(new Date(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slot" className="block font-medium mb-2">
          Select a Time Slot
        </label>
        <select
          id="slot"
          value={selectedSlot || ''}
          onChange={(e) => onSlotSelect(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="">Select a time slot</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block font-medium mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="notes" className="block font-medium mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;