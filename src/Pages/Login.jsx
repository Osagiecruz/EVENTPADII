import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import AuthLayout from '../AuthLayout';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  FacebookAuthProvider, // Import FacebookAuthProvider
  OAuthProvider // Import OAuthProvider for Apple
} from 'firebase/auth';
import { auth } from '../firebase'; // Ensure your firebase config is correctly imported

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  // useEffect for any initial setup if needed, similar to SignUp
  useEffect(() => {
    // For instance, if you want to check if a user is already logged in
    // and redirect them, you could add onAuthStateChanged here.
    // However, for a login page, it's often better to let them try to log in.
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (!email || !password) {
      alert("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, navigate to a protected route, e.g., dashboard or welcome
      navigate('/welcome');
    } catch (error) {
      console.error("Error during email/password sign-in:", error);
      // Display a user-friendly error message
      let errorMessage = "Failed to log in. Please check your credentials.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      }
      alert(errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true); // Start loading for social sign-in
      await signInWithPopup(auth, provider);
      // On successful Google sign-in, redirect to the welcome or dashboard page
      navigate('/welcome');
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAppleSignIn = async () => {
    // Apple sign-in typically requires more setup (e.g., Firebase project configuration)
    // and might behave differently on web vs. native.
    // Ensure OAuthProvider is properly configured in your Firebase project.
    const provider = new OAuthProvider('apple.com');
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate('/welcome');
    } catch (error) {
      console.error("Error during Apple sign-in:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate('/welcome');
    } catch (error) {
      console.error("Error during Facebook sign-in:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="font-bold text-2xl mb-2">Login</h1>
      <p className="text-gray-600 mb-6">Welcome back!</p>

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

        <label htmlFor="password" className="block mt-4 font-bold text-sm text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading} // Disable button while loading
          className="w-full mt-6 py-3 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500 bg-white">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="space-y-3 mt-6">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading} // Disable social buttons while loading
          className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle size={22} /> <span className='font-semibold text-gray-700'>Login with Google</span>
        </button>
        <button
          onClick={handleAppleSignIn}
          disabled={loading}
          className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BsApple size={22} /> <span className='font-semibold text-gray-700'>Login with Apple</span>
        </button>
        <button
          onClick={handleFacebookSignIn}
          disabled={loading}
          className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaFacebook size={22} /> <span className='font-semibold text-gray-700'>Login with Facebook</span>
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account? <a href="/signup" className="font-semibold text-blue-800 hover:underline">Sign Up</a>
      </p>
    </AuthLayout>
  );
};

export default Login;
