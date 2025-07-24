

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import AuthLayout from '../AuthLayout';
import { GoogleAuthProvider, signInWithPopup,  FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
    setIsLoaded(true);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    if (!agreed) {
      alert("You must accept the terms and conditions to continue.");
      return;
    }
    navigate('/create-password', { state: { email } });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        // On successful Google sign-in, redirect to the profile completion or dashboard
        navigate('/welcome'); 
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        alert(error.message);
    }
    navigate('/welcome'); // Redirect to complete profile after Google sign-in
  };

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider('apple.com');
    try {
        await signInWithPopup(auth, provider);
        // On successful Apple sign-in, redirect to the profile completion or dashboard
        navigate('/welcome'); 
    } catch (error) {
        console.error("Error during Apple sign-in:", error);
        alert(error.message);
    }
    navigate('/welcome'); // Redirect to complete profile after Apple sign-in
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        // On successful Facebook sign-in, redirect to the profile completion or dashboard
        navigate('/welcome'); 
    } catch (error) {
        console.error("Error during Facebook sign-in:", error);
        alert(error.message);
    }
    navigate('/welcome'); // Redirect to complete profile after Facebook sign-in
  };


  return (
    <AuthLayout>
      <h1 className="font-bold text-2xl mb-2">Sign Up</h1>
      <p className="text-gray-600 mb-6">Let's get you started!</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block mt-4 font-bold text-sm text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="mt-6 flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="transform scale-125 accent-blue-800 cursor-pointer mt-1"
            required
          />
          <label htmlFor="terms" className="text-xs ml-3 text-gray-600">
            By signing up or logging in, I accept the <a href="#" className="text-blue-800 font-semibold">EventPadi Terms of Services</a> and have read the <a href="#" className="text-blue-800 font-semibold">Privacy Policy</a>.
          </label>
        </div>

        <button type="submit" className="w-full mt-6 py-3 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-900 transition-all">
          Sign Up
        </button>
      </form>
      
      <div className="mt-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 bg-white">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="space-y-3 mt-6">
        <button onClick={handleGoogleSignIn} className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
          <FcGoogle size={22} /> <span className='font-semibold text-gray-700'>Sign up with Google</span>
        </button>
        <button onClick={handleAppleSignIn} className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
          <BsApple size={22} /> <span className='font-semibold text-gray-700'>Sign up with Apple</span>
        </button>
        <button onClick={handleFacebookSignIn} className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
          <FaFacebook size={22} /> <span className='font-semibold text-gray-700'>Sign up with Facebook</span>
        </button>

        {/* <button className="w-full mt-4 px-4 py-3 rounded-md text-[#1E3883] font-semibold shadow-md bg-[#D5D4D4] flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#c8c7c7] hover:scale-[1.01]">
//               <BsApple className="text-2xl text-[#000] transform transition-all duration-200 hover:scale-110" />
//               Sign in with Apple
//             </button> */}
         {/* Add Apple and Facebook buttons here */}
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account? <a href="/login" className="font-semibold text-blue-800 hover:underline">Login</a>
      </p>
    </AuthLayout>
  );
};

export default SignUp;