import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios';
import { useStateContext } from '../context/ContextProvider';

function VerifyEmail() {
  const { token } = useParams();
  const { setUserRole, setUserToken } = useStateContext();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axiosClient.get(`/verify-email/${token}`);
        console.log(data);
        
        if (data.user) {
          setUserToken(data.token);
          setUserRole(data.user.role);
          navigate('/dashboard'); // Navigate to dashboard if verification is successful
        } else {
          setMessage('Token invalid');
        }

      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Token invalid';
        setMessage(errorMessage);
        setStatus(error.response?.status || '');
      }
    };

    verifyEmail();
  }, [token, navigate, setUserRole, setUserToken]);

  return (
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">{status}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{message}</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, the provided token is invalid.</p>
        
      </div>
    </main>
  );
}

export default VerifyEmail;