import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase/config';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  const email = location.state?.email;
  const message = location.state?.message;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.emailVerified) {
          // User has verified their email, redirect to dashboard or home
          navigate('/dashboard'); // Adjust route as needed
        }
      } else {
        // No user found, redirect to login
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleResendVerification = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendEmailVerification(user, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false
      });
      setSuccess('Verification email sent! Please check your inbox.');
    } catch (error) {
      console.error('Error sending verification email:', error);
      setError('Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      await user.reload();
      if (user.emailVerified) {
        navigate('/welcome-after-signup'); // Adjust route as needed
      } else {
        setError('Email not verified yet. Please check your email and click the verification link.');
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
      setError('Failed to check verification status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-3 text-sm font-medium">
        <span>9:41</span>
        <div className="flex space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-1 bg-black rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Verify Your Email</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {/* Email Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Check Your Email
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {message || `We've sent a verification email to ${email}. Please check your inbox and click the verification link to complete your registration.`}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm text-center">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleCheckVerification}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Checking...' : 'I\'ve Verified My Email'}
          </button>

          <button
            onClick={handleResendVerification}
            disabled={isLoading}
            className="w-full bg-gray-100 text-gray-800 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Resend Verification Email'}
          </button>

          <button
            onClick={handleGoToLogin}
            className="w-full text-blue-600 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Back to Login
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={handleResendVerification}
              className="text-blue-600 hover:underline"
              disabled={isLoading}
            >
              resend verification email
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;