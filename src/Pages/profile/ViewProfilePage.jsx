// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ViewProfilePage = () => {
//   const navigate = useNavigate();
//   const { userId } = useParams();
  
//   // Get profile data from Redux store or props
//   const { user } = useSelector(state => state.auth);
//   const profileData = user; // Assuming profile data is in user object
  
//   const handleEdit = () => {
//     navigate('/profile/edit');
//   };

//   const handleChangePassword = () => {
//     navigate('/profile/change-password');
//   };

//   const handleGoBack = () => {
//     navigate(-1); // Go back to previous page
//   };

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
//       <div className="flex items-center justify-between px-6 py-4">
//         <button onClick={handleGoBack} className="mr-4">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-lg font-semibold">Profile</h1>
//         <button onClick={handleEdit}>
//           <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//           </svg>
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex-1 px-6 pb-6">
//         {/* Profile Picture & Basic Info */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="relative mb-4">
//             <div className="w-24 h-24 rounded-full overflow-hidden">
//               <img 
//                 src={profileData?.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"} 
//                 alt="Profile" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-1">
//             {profileData?.firstName && profileData?.lastName 
//               ? `${profileData.firstName} ${profileData.lastName}` 
//               : profileData?.name || 'Your Name'}
//           </h2>
//           <p className="text-gray-600 mb-1">@{profileData?.username || 'username'}</p>
//           {profileData?.location && (
//             <p className="text-gray-500 text-sm">{profileData.location}</p>
//           )}
//         </div>

//         {/* Profile Details */}
//         <div className="space-y-6 mb-8">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-gray-700 text-sm leading-relaxed">
//                 {profileData?.description || "Tell us something about yourself..."}
//               </p>
//             </div>
//           </div>

//           {/* Email Section */}
//           {profileData?.email && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-gray-700 text-sm">{profileData.email}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Edit Profile Button */}
//         <button
//           onClick={handleEdit}
//           className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-6"
//         >
//           Edit Profile
//         </button>

//         {/* Change Password Link */}
//         <button
//           onClick={handleChangePassword}
//           className="flex items-center justify-between w-full py-4 text-left"
//         >
//           <div className="flex items-center">
//             <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//             </svg>
//             <span className="text-blue-600 font-medium">Change password</span>
//           </div>
//           <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewProfilePage;