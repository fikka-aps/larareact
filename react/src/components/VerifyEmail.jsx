import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/verify-email/${token}`);
        setMessage('Email verified successfully');
        // Optionally store the token in local storage
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        setMessage('Email verification failed');
      }
    };
    verifyEmail();
  }, [token]);

  return <div>{message}</div>;
}

export default VerifyEmail;