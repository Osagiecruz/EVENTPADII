import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import AuthLayout from '../AuthLayout';

const VerifyEmail = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const handleContinue = async () => {
     await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
           navigate('/welcome');
        } else {
           alert("Email not verified yet.");
        }
        alert("Verification confirmed! (demo)");
        navigate('/welcome');
    };

  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-2">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to <strong>{user?.email}</strong>. Please click the link to continue.
        </p>
        <div className="my-8 text-6xl text-indigo-600">
                    ✉️
                </div>
        <button onClick={handleContinue} className="w-full mt-6 py-3 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-900 transition-all">
          I've Verified, Continue
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or <a href="#" className="font-semibold text-blue-800">resend the link</a>.
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;