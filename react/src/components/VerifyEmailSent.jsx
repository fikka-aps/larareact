import React from 'react';
import { useStateContext } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

function VerifyEmailSent() {
const {userToken} = useStateContext();

if (userToken) {
    return <Navigate to='/home' />
}
  return (
    <main className="grid min-h-lvh place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Verify Your Email</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">An email has been sent to your email address. Please check your inbox and follow the instructions to verify your email.</p>
      
    </div>
  </main>
  );
}

export default VerifyEmailSent;