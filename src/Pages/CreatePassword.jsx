import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import AuthLayout from '../AuthLayout';

const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Safely get email from route state

  // Redirect if email is not available
   useEffect(() => {
    if (!email) {
      alert("No email provided. Redirecting to sign up.");
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Passwords must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Verification email sent! Please check your inbox.");
      navigate('/verify-email', { state: { email } });
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }

    setTimeout(() => { // Demo delay
        alert(`Account created for ${email}. Verification email sent (demo).`);
        setLoading(false);
        navigate('/verify-email', { state: { email } });
    }, 1500);
  };

  return (
    <AuthLayout>
      <h1 className="font-bold text-2xl mb-2">Create Your Password</h1>
      <p className="text-gray-600 mb-6">Your password must be secure and memorable.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mt-4 font-bold text-sm text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mt-4 font-bold text-sm text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="w-full mt-8 py-3 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-900 transition-all disabled:bg-blue-400">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default CreatePassword;