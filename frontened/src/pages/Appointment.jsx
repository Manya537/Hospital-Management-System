import React from 'react'
import Hero from '../components/Hero'
import AppointmentForm from '../components/AppointmentForm'


const Appointment = () => {
  return (
    <>
    <Hero 
    title={"Select Your Appointment | Zeecare Medical Instittute"}
    imageUrl={"/signin.png"}
    />
    <AppointmentForm/>
    </>
   
  );
};

export default Appointment;