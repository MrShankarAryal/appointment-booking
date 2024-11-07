import React from 'react';
import AppointmentBooking from '../components/AppointmentBooking';
import CalendarView from '../components/CalendarView';

const AppointmentsPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <AppointmentBooking />
      <CalendarView />
    </div>
  );
};

export default AppointmentsPage;