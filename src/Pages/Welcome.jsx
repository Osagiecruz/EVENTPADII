import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import logo from '/logo.png';

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4">
             <img
              className="w-40 mb-8"
              src={logo}
              alt="EventPadi Logo"
            />
            <div className="w-full max-w-md bg-white p-8 sm:p-12 text-center rounded-xl shadow-lg">
                <div className="mx-auto w-24 h-24 flex items-center justify-center bg-green-100 rounded-full">
                    <FaCheck size={48} className="text-green-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mt-6">Welcome to EventPadi!</h1>
                <p className="text-slate-600 mt-2">
                    You're all set to explore the events on EventPadi. But first, let's set up your profile to help others get to know you better.
                </p>
                <div className="mt-8 space-y-4">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-3 bg-indigo-800 text-white rounded-lg font-semibold hover:bg-indigo-900 transition-all"
                    >
                        Go to Event Page
                    </button>
                    <button 
                        onClick={() => navigate('/complete-profile')}
                        className="w-full py-3 bg-white text-slate-800 border border-slate-300 rounded-lg font-semibold hover:bg-slate-100 transition-all"
                    >
                        Set Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;