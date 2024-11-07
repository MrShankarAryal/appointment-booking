import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { getAppointments } from '../utils/api';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getAppointments(selectedDate);
      setAppointments(appointments);
    };
    fetchAppointments();
  }, [selectedDate]);

  const renderCalendarHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setSelectedDate(startOfMonth(selectedDate))}
        >
          Prev
        </button>
        <h2 className="text-2xl font-bold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setSelectedDate(endOfMonth(selectedDate))}
        >
          Next
        </button>
      </div>
    );
  };

  const renderCalendarDays = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={format(day, 'yyyy-MM-dd')}
            className={`p-2 rounded ${
              isSameDay(day, new Date())
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    );
  };

  const renderAppointments = () => {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Appointments</h3>
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-gray-200 p-4 rounded mb-2"
          >
            <p className="font-medium">
              {format(new Date(appointment.date), 'MMM d, yyyy')} at{' '}
              {appointment.slot}
            </p>
            <p>Name: {appointment.name}</p>
            <p>Email: {appointment.email}</p>
            <p>Phone: {appointment.phone}</p>
            <p>Notes: {appointment.notes}</p>
          </div>
        ))}
      </div>
    );
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Appointment Calendar</h2>
      {renderCalendarHeader()}
      {renderCalendarDays()}
      {renderAppointments()}
    </div>
  );
};

export default CalendarView;