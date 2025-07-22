import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 30000); // 30 seconds

    return () => clearTimeout(timer); // cleanup if component unmounts
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
          </div>
        </div>
        <span className="text-2xl font-bold text-gray-800">EventPadi</span>
      </div>
    </div>
  );
};

export default SplashPage;
