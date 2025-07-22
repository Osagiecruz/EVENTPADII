import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WelcomePageAfterSignup = () => {
  const navigate = useNavigate();
  
  const authState = useSelector((state) => {
    console.log('WelcomeAfterSignup - auth slice:', state.auth);
    return state.auth;
  });

  const { isAuthenticated, user } = authState || {};

  console.log('WelcomeAfterSignup component rendering - isAuthenticated:', isAuthenticated);

  const handleGoToEvents = () => {
    // After successful signup/login, user should go to main app
    if (isAuthenticated) {
      navigate('/home'); // or wherever your main events page is
    } else {
      navigate('/login'); // If somehow not authenticated, go to login
    }
  };

  const handleSetProfile = () => {
    console.log('Set profile clicked - Authenticated:', isAuthenticated);
    if (isAuthenticated) {
      navigate('/profile/edit'); // Redirect to profile setup
    } else {
      navigate('/login'); // If not authenticated, go to login
    }
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

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to EventPadi!
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            You're all set to explore the events in EventPadi. But first, let's set up your profile 
            so others can find and trust you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <button
            onClick={handleSetProfile}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Set Profile
          </button>
          
          <button
            onClick={handleGoToEvents}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            Go to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePageAfterSignup;