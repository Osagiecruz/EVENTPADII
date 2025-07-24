// import React from "react";
// import dance from "/Dance.png";
// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { BsApple } from "react-icons/bs";
// import { FaFacebook } from "react-icons/fa";
// import logo from "/logo.png";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//   });
//   const [isLoaded, setIsLoaded] = useState(false);

//   React.useEffect(() => {
//     setIsLoaded(true);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   console.log("Form submitted:", formData);
//   //   // Handle form submission here
//   //   alert("Form submitted successfully!");
//   // };

//   // const SignUp = () => {
//   return (
//     <div className="bg-[#434e7552] h-full w-full p-16">
//       <div
//         className={`w-[1200px] bg-white mx-auto rounded-lg grid grid-cols-2 shadow-lg overflow-hidden transform transition-all duration-1000 ${
//           isLoaded
//             ? "translate-y-0 opacity-100 scale-100"
//             : "translate-y-10 opacity-0 scale-95"
//         }`}
//       >
//         <div
//           className={`h-[800px] w-full bg-no-repeat bg-cover bg-center relative transform transition-all duration-1200 delay-300 ${
//             isLoaded ? "scale-100" : "scale-110"
//           }`}
//           style={{ backgroundImage: "url('/Dance.png')" }}
//         >
//           <div className="absolute inset-0 bg-[#7f95d258]">
//             <img
//               className="w-[180px] pt-[4rem] pl-[4rem]"
//               src={logo}
//               alt="logo"
//             />
//             <h1 className="pl-[4rem] pt-96 text-[#ffff] text-[35px] font-semibold w-[70%]">Discover Events. Find Your People</h1>
//             <p className="pl-[4rem] text-[20px] text-[#fff] font-bold mt-8 w-[70%] leading-8">Connect with others attending public events in your city</p>
//           </div>
//         </div>
//         <div className="p-10">
//           <h1
//             className={`font-bold text-[20px] mt-20 transform transition-all duration-800 delay-500 ${
//               isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//             }`}
//           >
//             Sign Up
//           </h1>

//           {/* Email Input */}
//           <div
//             className={`transform transition-all duration-800 delay-600 ${
//               isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//             }`}
//           >
//             <label htmlFor="email" className="block mt-6 font-bold text-[14px]">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Enter your email"
//               className="w-full mt-4 px-4 py-3 border text-[13px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent shadow-md bg-[#D5D4D4] transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
//               required
//             />
//           </div>
//           {/* End of Email Input */}

//           {/* checkbox */}
//           <div
//             className={`transform transition-all duration-800 delay-700 ${
//               isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//             }`}
//           >
//             <input
//               type="checkbox"
//               className="transform scale-150 accent-blue-800 cursor-pointer mt-8 transition-all duration-200 hover:scale-[1.6]"
//             />
//             <span className="text-[12px] ml-3 mt-8 font-semibold">
//               By signing up or logging in, I accept the{" "}
//               <span className="text-[#1E3883] font-semibold hover:underline transition-all duration-200 cursor-pointer">
//                 EventPadi Terms of Services
//               </span>
//               and have read the{" "}
//               <span className="text-[#1E3883] font-semibold hover:underline transition-all duration-200 cursor-pointer">
//                 privacy policy
//               </span>
//             </span>
//           </div>

//           {/* SignUp Button */}
//           <div
//             className={`transform transition-all duration-800 delay-800 ${
//               isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//             }`}
//           >
//             <button className="w-full mt-10 px-4 py-3 bg-[#1E3883] rounded-md text-[#fff] font-semibold shadow-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-[#152b6b] hover:scale-[1.02]">
//               sign up
//             </button>
//           </div>

//           <div
//             className={`space-y-4 transform transition-all duration-800 delay-900 ${
//               isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//             }`}
//           >
//             <button className="w-full mt-10 px-4 py-3 rounded-md text-[#1E3883] font-semibold shadow-md bg-[#D5D4D4] flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#c8c7c7] hover:scale-[1.01]">
//               <FcGoogle className="text-2xl transform transition-all duration-200 hover:scale-110" />
//               Sign in with Google
//             </button>
//             <button className="w-full mt-4 px-4 py-3 rounded-md text-[#1E3883] font-semibold shadow-md bg-[#D5D4D4] flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#c8c7c7] hover:scale-[1.01]">
//               <BsApple className="text-2xl text-[#000] transform transition-all duration-200 hover:scale-110" />
//               Sign in with Apple
//             </button>
//             <button className="w-full mt-4 px-4 py-3 rounded-md text-[#1E3883] font-semibold shadow-md bg-[#D5D4D4] flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#c8c7c7] hover:scale-[1.01]">
//               <FaFacebook className="text-2xl text-[#1E3883] transform transition-all duration-200 hover:scale-110" />
//               Sign in with Facebook
//             </button>
//           </div>

//           <div
//             className={`mt-20 transform transition-all duration-800 delay-1000 ${
//               isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//             }`}
//           >
//             <small className="text-[#777b7b] inline-block">
//               Already have an account?
//             </small>
//             <a
//               href=""
//               className="text-[#1E3883] font-semibold text-[12px] ml-3 hover:underline transition-all duration-200 hover:text-[#152b6b]"
//             >
//               Login
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
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