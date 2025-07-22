// import React, { useState, useEffect } from 'react';

// const EmailVerification = ({ email, onVerificationComplete, onBack }) => {
//   const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setCanResend(true);
//     }
//   }, [timeLeft]);

//   const handleInputChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newCode = [...verificationCode];
//       newCode[index] = value;
//       setVerificationCode(newCode);
//       setError(''); // Clear error when user types

//       // Auto-focus next input
//       if (value && index < 5) {
//         const nextInput = document.getElementById(`code-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
//       const prevInput = document.getElementById(`code-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   const generateNewCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const sendVerificationEmail = async (email, code) => {
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // In a real application, you would call your backend API here
//     console.log(`New verification code ${code} sent to ${email}`);
    
//     // For demo purposes, we'll store the code in sessionStorage
//     sessionStorage.setItem('verificationCode', code);
    
//     return true;
//   };

//   const handleResendOTP = async () => {
//     try {
//       const newCode = generateNewCode();
//       await sendVerificationEmail(email, newCode);
      
//       setTimeLeft(30);
//       setCanResend(false);
//       setVerificationCode(['', '', '', '', '', '']);
//       setError('');
      
//       // Reset focus to first input
//       const firstInput = document.getElementById('code-0');
//       if (firstInput) firstInput.focus();
//     } catch (error) {
//       setError('Failed to resend code. Please try again.');
//     }
//   };

//   const verifyCode = async (code) => {
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     // Get the stored verification code
//     const storedCode = sessionStorage.getItem('verificationCode');
    
//     if (code === storedCode) {
//       return true;
//     } else {
//       throw new Error('Invalid verification code');
//     }
//   };

//   const handleContinue = async () => {
//     const code = verificationCode.join('');
//     if (code.length === 6) {
//       setIsVerifying(true);
//       setError('');
      
//       try {
//         await verifyCode(code);
        
//         // Get pending user data
//         const pendingUserData = JSON.parse(sessionStorage.getItem('pendingUserData') || '{}');
        
//         // Clear verification data
//         sessionStorage.removeItem('verificationCode');
//         sessionStorage.removeItem('verificationEmail');
//         sessionStorage.removeItem('pendingUserData');
        
//         // Complete verification
//         onVerificationComplete({
//           email: pendingUserData.email,
//           password: pendingUserData.password
//         });
        
//       } catch (error) {
//         setError('Invalid verification code. Please try again.');
//         setVerificationCode(['', '', '', '', '', '']);
//         // Focus first input
//         const firstInput = document.getElementById('code-0');
//         if (firstInput) firstInput.focus();
//       } finally {
//         setIsVerifying(false);
//       }
//     }
//   };

//   const isCodeComplete = verificationCode.every(digit => digit !== '');

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       {/* Status Bar */}
//       <div className="flex justify-between items-center px-6 py-3 text-sm font-medium">
//         <span>9:41</span>
//         <div className="flex space-x-1">
//           <div className="flex space-x-1">
//             <div className="w-1 h-1 bg-black rounded-full"></div>
//             <div className="w-1 h-1 bg-black rounded-full"></div>
//             <div className="w-1 h-1 bg-black rounded-full"></div>
//           </div>
//           <div className="w-6 h-3 border border-black rounded-sm">
//             <div className="w-4 h-1 bg-black rounded-sm m-0.5"></div>
//           </div>
//         </div>
//       </div>

//       {/* Header */}
//       <div className="flex items-center px-6 py-4">
//         <button 
//           className="mr-4"
//           onClick={onBack}
//           disabled={isVerifying}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-lg font-semibold text-gray-800">Confirm Email</h1>
//       </div>

//       {/* Content */}
//       <div className="flex-1 px-6 py-8">
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Verification Code</h2>
//           <p className="text-gray-600">
//             We sent a code to your email at{' '}
//             <span className="font-medium">{email}</span>, enter the code here
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 text-sm">{error}</p>
//           </div>
//         )}

//         {/* Verification Code Input */}
//         <div className="flex justify-between mb-8">
//           {verificationCode.map((digit, index) => (
//             <input
//               key={index}
//               id={`code-${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
//               maxLength="1"
//               disabled={isVerifying}
//             />
//           ))}
//         </div>

//         {/* Resend Options */}
//         <div className="flex justify-between items-center mb-8">
//           <button className="text-gray-600 text-sm">
//             Didn't receive any code?
//           </button>
//           <button
//             onClick={handleResendOTP}
//             disabled={!canResend || isVerifying}
//             className={`text-sm font-medium ${
//               canResend && !isVerifying ? 'text-blue-600' : 'text-gray-400'
//             }`}
//           >
//             {canResend ? 'Resend OTP' : `Resend OTP in 0:${timeLeft.toString().padStart(2, '0')}`}
//           </button>
//         </div>

//         {/* Continue Button */}
//         <div className="mt-auto">
//           <button
//             onClick={handleContinue}
//             disabled={!isCodeComplete || isVerifying}
//             className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//           >
//             {isVerifying ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Verifying...
//               </>
//             ) : (
//               'Continue'
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailVerification;