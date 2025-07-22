import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/login'); // For returning users (authenticated = true but not logged in yet)
    } else {
      navigate('/signup'); // For new users
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

      {/* Logo */}
      <div className="flex items-center justify-center mt-8 mb-12">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">EventPadi</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm h-64 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 rounded-2xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-2 border-white"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          <div className="absolute top-4 left-4 w-3 h-3 bg-white/60 rounded-full"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="absolute bottom-12 right-6 w-4 h-4 bg-white/30 rounded-full"></div>
        </div>

        {/* Tagline */}
        <h1 className="text-xl font-bold text-gray-800 text-center mb-2">
          Discover Events. Find Your People.
        </h1>
        <p className="text-gray-600 text-center mb-12 px-4">
          Connect with others attending public events in your city.
        </p>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="w-full max-w-sm bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
