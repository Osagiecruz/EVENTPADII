// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth, db, storage } from '../../services/firebase/config'; // Adjust path as needed

// const EditProfilePage = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     location: '',
//     description: '',
//     profileImage: null,
//     profileImageUrl: '',
//     interests: []
//   });

//   const [savedProfileData, setSavedProfileData] = useState(null);
//   const [lastSaveDate, setLastSaveDate] = useState(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // Available interests list
//   const availableInterests = [
//     'Technology', 'Sports', 'Music', 'Travel', 'Photography', 'Cooking', 
//     'Reading', 'Gaming', 'Art', 'Fitness', 'Movies', 'Fashion', 
//     'Dancing', 'Writing', 'Nature', 'Science', 'Business', 'Health'
//   ];

//   // Monitor authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         loadUserProfile(user.uid);
//       } else {
//         setCurrentUser(null);
//         setLoading(false);
//         // Redirect to login if no user
//         navigate('/login');
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   // Load user profile from Firestore
//   const loadUserProfile = async (userId) => {
//     try {
//       setLoading(true);
//       const userDocRef = doc(db, 'users', userId);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
        
//         // Set profile data from Firestore
//         setProfileData({
//           firstName: userData.firstName || '',
//           lastName: userData.lastName || '',
//           username: userData.username || '',
//           location: userData.location || '',
//           description: userData.description || '',
//           profileImage: null, // Reset file input
//           profileImageUrl: userData.profileImageUrl || '',
//           interests: userData.interests || []
//         });

//         // Set saved data for comparison
//         setSavedProfileData({
//           firstName: userData.firstName || '',
//           lastName: userData.lastName || '',
//           username: userData.username || '',
//           location: userData.location || '',
//           description: userData.description || '',
//           profileImageUrl: userData.profileImageUrl || '',
//           interests: userData.interests || []
//         });

//         // Set last save date if exists
//         if (userData.lastUpdated) {
//           setLastSaveDate(userData.lastUpdated.toDate());
//         }
//       } else {
//         // New user - initialize with auth data
//         const initialData = {
//           firstName: currentUser?.displayName?.split(' ')[0] || '',
//           lastName: currentUser?.displayName?.split(' ').slice(1).join(' ') || '',
//           username: '',
//           location: '',
//           description: '',
//           profileImage: null,
//           profileImageUrl: currentUser?.photoURL || '',
//           interests: []
//         };
//         setProfileData(initialData);
//       }
//     } catch (error) {
//       console.error('Error loading user profile:', error);
//       alert('Error loading profile data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setProfileData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should be less than 5MB');
//         return;
//       }

//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         alert('Please select a valid image file');
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfileData(prev => ({
//           ...prev,
//           profileImage: file,
//           profileImageUrl: e.target.result // For preview
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // const uploadProfileImage = async (file, userId) => {
//   //   try {
//   //     const imageRef = ref(storage, `profile-images/${userId}`);
//   //     const snapshot = await uploadBytes(imageRef, file);
//   //     const downloadURL = await getDownloadURL(snapshot.ref);
//   //     return downloadURL;
//   //   } catch (error) {
//   //     console.error('Error uploading image:', error);
//   //     throw new Error('Failed to upload image');
//   //   }
//   // };
//   // ✅ Fix: correct upload path & fallback image URL when getDownloadURL fails
// // ✅ SOLUTION 1: Updated uploadProfileImage function with better error handling
// const uploadProfileImage = async (file, userId) => {
//   try {
//     // Ensure user is authenticated
//     if (!auth.currentUser) {
//       throw new Error('User must be authenticated to upload images');
//     }

//     // Create a more specific file path with timestamp to avoid conflicts
//     const timestamp = Date.now();
//     const ext = file.name.split('.').pop().toLowerCase();
//     const fileName = `${userId}_${timestamp}.${ext}`;
    
//     // Use the correct storage reference path
//     const imageRef = ref(storage, `profile-images/${fileName}`);
    
//     // Upload with metadata
//     const metadata = {
//       contentType: file.type,
//       customMetadata: {
//         uploadedBy: userId,
//         uploadedAt: new Date().toISOString()
//       }
//     };
    
//     console.log('Starting upload to:', `profile-images/${fileName}`);
//     const snapshot = await uploadBytes(imageRef, file, metadata);
//     console.log('Upload successful, getting download URL...');
    
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     console.log('Download URL obtained:', downloadURL);
    
//     return downloadURL;
//   } catch (error) {
//     console.error('Upload error details:', {
//       code: error.code,
//       message: error.message,
//       serverResponse: error.serverResponse
//     });
    
//     // Provide more specific error messages
//     if (error.code === 'storage/unauthorized') {
//       throw new Error('You do not have permission to upload files. Please check your authentication.');
//     } else if (error.code === 'storage/quota-exceeded') {
//       throw new Error('Storage quota exceeded. Please try again later.');
//     } else if (error.code === 'storage/invalid-format') {
//       throw new Error('Invalid file format. Please upload a valid image file.');
//     } else {
//       throw new Error(`Upload failed: ${error.message}`);
//     }
//   }
// };

//   const handleInterestToggle = (interest) => {
//     setProfileData(prev => ({
//       ...prev,
//       interests: prev.interests.includes(interest)
//         ? prev.interests.filter(i => i !== interest)
//         : [...prev.interests, interest]
//     }));
//   };

//   const canEdit30DayFields = () => {
//     if (!lastSaveDate) return true;
//     const daysDiff = (new Date() - lastSaveDate) / (1000 * 60 * 60 * 24);
//     return daysDiff >= 30;
//   };

//   const canEditNameFields = () => {
//     return !savedProfileData || (!savedProfileData.firstName && !savedProfileData.lastName);
//   };

// // ✅ SOLUTION 2: Enhanced handleSave function with better image upload flow
// const handleSave = async () => {
//   if (!currentUser) {
//     alert('Please log in to save your profile');
//     return;
//   }

//   // Validate image file if selected
//   if (profileData.profileImage) {
//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//     if (!validTypes.includes(profileData.profileImage.type)) {
//       alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
//       return;
//     }
    
//     if (profileData.profileImage.size > 5 * 1024 * 1024) {
//       alert('Image size must be less than 5MB');
//       return;
//     }
//   }

//   try {
//     setSaving(true);
//     const userId = currentUser.uid;
//     const userDocRef = doc(db, 'users', userId);
    
//     let profileImageUrl = profileData.profileImageUrl;
    
//     // Upload new image if selected
//     if (profileData.profileImage) {
//       try {
//         console.log('Uploading new profile image...');
//         profileImageUrl = await uploadProfileImage(profileData.profileImage, userId);
//         console.log('Image upload successful:', profileImageUrl);
//       } catch (error) {
//         console.error('Image upload failed:', error);
//         alert(`Failed to upload image: ${error.message}`);
//         setSaving(false);
//         return;
//       }
//     }

//     // Prepare data to save
//     const dataToSave = {
//       firstName: profileData.firstName,
//       lastName: profileData.lastName,
//       username: profileData.username,
//       location: profileData.location,
//       description: profileData.description,
//       profileImageUrl: profileImageUrl,
//       interests: profileData.interests,
//       lastUpdated: new Date(),
//       email: currentUser.email // Keep email from auth
//     };

//     // Save to Firestore
//     const userDoc = await getDoc(userDocRef);
//     if (userDoc.exists()) {
//       await updateDoc(userDocRef, dataToSave);
//     } else {
//       await setDoc(userDocRef, dataToSave);
//     }
    
//     // Update local state
//     const currentDate = new Date();
//     setSavedProfileData({
//       firstName: profileData.firstName,
//       lastName: profileData.lastName,
//       username: profileData.username,
//       location: profileData.location,
//       description: profileData.description,
//       profileImageUrl: profileImageUrl,
//       interests: [...profileData.interests]
//     });
//     setLastSaveDate(currentDate);

//     // Update profileData to reflect saved image URL
//     setProfileData(prev => ({
//       ...prev,
//       profileImageUrl: profileImageUrl,
//       profileImage: null // Clear file input
//     }));
    
//     // Show success message
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);
    
//   } catch (error) {
//     console.error('Save profile error:', error);
//     alert(`Error saving profile: ${error.message}`);
//   } finally {
//     setSaving(false);
//   }
// };

//   // ✅ Optional: Add clearSavedData demo function for easier testing
// const clearSavedData = async () => {
//   if (currentUser) {
//     try {
//       const userDocRef = doc(db, 'users', currentUser.uid);
//       await setDoc(userDocRef, {});
//       loadUserProfile(currentUser.uid);
//     } catch (error) {
//       console.error('Failed to clear saved data:', error);
//     }
//   }
// };

//   const handleBack = () => {
//     navigate('/welcome-after-signup');
//   };

//   const handleChangePassword = () => {
//     navigate('/profile/change-password');
//   };

//   const isFormValid = profileData.firstName && profileData.lastName && profileData.username;

//   const getDaysUntilEdit = () => {
//     if (!lastSaveDate || canEdit30DayFields()) return 0;
//     const daysDiff = (new Date() - lastSaveDate) / (1000 * 60 * 60 * 24);
//     return Math.ceil(30 - daysDiff);
//   };

//   // Demo function to simulate 30 days passing (for testing)
//   const simulateTimePassing = async () => {
//     if (lastSaveDate && currentUser) {
//       try {
//         const newDate = new Date(lastSaveDate);
//         newDate.setDate(newDate.getDate() - 31); // Simulate 31 days ago
        
//         const userDocRef = doc(db, 'users', currentUser.uid);
//         await updateDoc(userDocRef, {
//           lastUpdated: newDate
//         });
        
//         setLastSaveDate(newDate);
//       } catch (error) {
//         console.error('Error updating timestamp:', error);
//       }
//     }
//   };

//     if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }


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
//         <button onClick={handleBack} className="mr-4 hover:bg-gray-100 p-1 rounded-full">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-lg font-semibold">Edit Profile</h1>
//       </div>

//       {/* Success Message */}
//       {showSuccessMessage && (
//         <div className="mx-6 mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
//           <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//           </svg>
//           Profile saved successfully!
//         </div>
//       )}

//       {/* Demo Controls */}
//       {savedProfileData && (
//         <div className="mx-6 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//           <div className="text-sm text-blue-800 mb-2">Demo Controls:</div>
//           <div className="flex gap-2 flex-wrap">
//             <button
//               onClick={simulateTimePassing}
//               className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//             >
//               Simulate 30+ days passed
//             </button>
//             <button
//               onClick={clearSavedData}
//               className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Clear all saved data
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       <div className="flex-1 px-6 pb-6">
//         {/* Profile Picture */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="relative mb-4">
//             <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
//               {/* {profileData.profileImage ? (
//                 <img 
//                   src={profileData.profileImage} 
//                   alt="Profile" 
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-orange-200 flex items-center justify-center">
//                   <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               )} */}
//               // ✅ Fix: update invalid image rendering in preview
// {profileData.profileImage ? (
//   <img 
//     src={profileData.profileImageUrl} 
//     alt="Profile" 
//     className="w-full h-full object-cover"
//   />
// ) : profileData.profileImageUrl ? (
//   <img
//     src={profileData.profileImageUrl}
//     alt="Profile"
//     className="w-full h-full object-cover"
//   />
// ) : (
//   <div className="w-full h-full bg-orange-200 flex items-center justify-center">
//     <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//     </svg>
//   </div>
// )}
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//               id="profile-upload"
//             />
//           </div>
//           <label 
//             htmlFor="profile-upload"
//             className="text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors"
//           >
//             Update picture
//           </label>
//           <div className="text-xs text-gray-500 mt-1">Can be changed anytime</div>
//         </div>

//         {/* Form Fields */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               First name 
//               {!canEditNameFields() && (
//                 <span className="text-sm text-red-500 ml-2">
//                   <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
//                   </svg>
//                   Locked after first save
//                 </span>
//               )}
//             </label>
//             <input
//               type="text"
//               value={profileData.firstName}
//               onChange={(e) => handleInputChange('firstName', e.target.value)}
//               disabled={!canEditNameFields()}
//               className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                 !canEditNameFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
//               }`}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Last name 
//               {!canEditNameFields() && (
//                 <span className="text-sm text-red-500 ml-2">
//                   <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
//                   </svg>
//                   Locked after first save
//                 </span>
//               )}
//             </label>
//             <input
//               type="text"
//               value={profileData.lastName}
//               onChange={(e) => handleInputChange('lastName', e.target.value)}
//               disabled={!canEditNameFields()}
//               className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                 !canEditNameFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
//               }`}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Username 
//               {!canEdit30DayFields() && (
//                 <span className="text-sm text-orange-500 ml-2">
//                   <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   Editable in {getDaysUntilEdit()} days
//                 </span>
//               )}
//             </label>
//             <input
//               type="text"
//               value={profileData.username}
//               onChange={(e) => handleInputChange('username', e.target.value)}
//               disabled={!canEdit30DayFields()}
//               className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                 !canEdit30DayFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
//               }`}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email</label>
//             <div className="text-gray-600 py-3 px-4 bg-gray-50 rounded-lg border">
//               {currentUser?.email || 'Email not available'}

//             </div>
//             <div className="text-xs text-gray-500 mt-1">Email cannot be changed</div>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Location 
//               {!canEdit30DayFields() && (
//                 <span className="text-sm text-orange-500 ml-2">
//                   <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   Editable in {getDaysUntilEdit()} days
//                 </span>
//               )}
//             </label>
//             <input
//               type="text"
//               value={profileData.location}
//               onChange={(e) => handleInputChange('location', e.target.value)}
//               disabled={!canEdit30DayFields()}
//               className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                 !canEdit30DayFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
//               }`}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Description
//               <span className="text-sm text-green-500 ml-2">
//                 <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//                 Can be changed anytime
//               </span>
//             </label>
//             <textarea
//               value={profileData.description}
//               onChange={(e) => handleInputChange('description', e.target.value)}
//               placeholder="Write about yourself...."
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//             />
//           </div>

//           {/* Interests Section */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-3">
//               Interests
//               {!canEdit30DayFields() && (
//                 <span className="text-sm text-orange-500 ml-2">
//                   <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   Editable in {getDaysUntilEdit()} days
//                 </span>
//               )}
//               {canEdit30DayFields() && (
//                 <span className="text-sm text-green-500 ml-2">
//                   <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                   Select your interests
//                 </span>
//               )}
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               {availableInterests.map((interest) => (
//                 <button
//                   key={interest}
//                   onClick={() => canEdit30DayFields() && handleInterestToggle(interest)}
//                   disabled={!canEdit30DayFields()}
//                   className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
//                     profileData.interests.includes(interest)
//                       ? 'bg-blue-500 text-white border-blue-500 shadow-md'
//                       : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
//                   } ${
//                     !canEdit30DayFields() 
//                       ? 'opacity-50 cursor-not-allowed' 
//                       : 'cursor-pointer transform hover:scale-105'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{interest}</span>
//                     {profileData.interests.includes(interest) && (
//                       <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <div className="mt-3 flex items-center justify-between text-sm">
//               <div className="text-gray-600">
//                 Selected: <span className="font-semibold text-blue-600">{profileData.interests.length}</span> interest{profileData.interests.length !== 1 ? 's' : ''}
//               </div>
//               {profileData.interests.length > 0 && (
//                 <div className="text-gray-500">
//                   Max 10 interests recommended
//                 </div>
//               )}
//             </div>
//             {profileData.interests.length > 0 && (
//               <div className="mt-2 p-2 bg-blue-50 rounded-lg">
//                 <div className="text-xs text-blue-700 font-medium mb-1">Your interests:</div>
//                 <div className="flex flex-wrap gap-1">
//                   {profileData.interests.map((interest, index) => (
//                     <span key={interest} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                       {interest}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Save Button */}
//         <button
//           onClick={handleSave}
//           disabled={!isFormValid}
//           className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 mt-8 mb-6 ${
//             isFormValid
//               ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg'
//               : 'bg-gray-400 text-gray-200 cursor-not-allowed'
//           }`}
//         >
//           <div className="flex items-center justify-center">
//             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Save Changes
//           </div>
//         </button>

//         {/* Profile Info Display */}
//         {savedProfileData && (
//           <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
//             <div className="flex items-center mb-3">
//               <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <h3 className="font-bold text-gray-800">Saved Profile Summary</h3>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <span className="font-semibold text-gray-700 w-20">Name:</span>
//                   <span className="text-gray-600">{savedProfileData.firstName} {savedProfileData.lastName}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-semibold text-gray-700 w-20">Username:</span>
//                   <span className="text-gray-600">@{savedProfileData.username}</span>
//                 </div>
//                 {savedProfileData.location && (
//                   <div className="flex items-center">
//                     <span className="font-semibold text-gray-700 w-20">Location:</span>
//                     <span className="text-gray-600">{savedProfileData.location}</span>
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 {savedProfileData.interests.length > 0 && (
//                   <div>
//                     <span className="font-semibold text-gray-700">Interests:</span>
//                     <div className="flex flex-wrap gap-1 mt-1">
//                       {savedProfileData.interests.map((interest) => (
//                         <span key={interest} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                           {interest}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {lastSaveDate && (
//                   <div className="flex items-center">
//                     <span className="font-semibold text-gray-700 w-24">Last saved:</span>
//                     <span className="text-gray-600">{lastSaveDate.toLocaleDateString()}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Rules Info */}
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
//           <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
//             <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//             </svg>
//             Edit Rules
//           </h4>
//           <div className="text-sm text-gray-600 space-y-1">
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
//               <span><strong>Names:</strong> Cannot be edited after first save</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
//               <span><strong>Username, Location, Interests:</strong> Editable every 30 days</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
//               <span><strong>Description, Picture:</strong> Can be changed anytime</span>
//             </div>
//           </div>
//         </div>

//         {/* Change Password Link */}
//         <button
//           onClick={handleChangePassword}
//           className="flex items-center justify-between w-full py-4 px-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
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

// export default EditProfilePage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../services/firebase/config'; // Remove storage import

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    location: '',
    description: '',
    profileImageUrl: '', // Only store URL, no file
    interests: []
  });

  const [savedProfileData, setSavedProfileData] = useState(null);
  const [lastSaveDate, setLastSaveDate] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // New state for URL input
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Available interests list
  const availableInterests = [
    'Technology', 'Sports', 'Music', 'Travel', 'Photography', 'Cooking', 
    'Reading', 'Gaming', 'Art', 'Fitness', 'Movies', 'Fashion', 
    'Dancing', 'Writing', 'Nature', 'Science', 'Business', 'Health'
  ];

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        loadUserProfile(user.uid);
      } else {
        setCurrentUser(null);
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Load user profile from Firestore
  const loadUserProfile = async (userId) => {
    try {
      setLoading(true);
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        setProfileData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          username: userData.username || '',
          location: userData.location || '',
          description: userData.description || '',
          profileImageUrl: userData.profileImageUrl || '',
          interests: userData.interests || []
        });

        setSavedProfileData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          username: userData.username || '',
          location: userData.location || '',
          description: userData.description || '',
          profileImageUrl: userData.profileImageUrl || '',
          interests: userData.interests || []
        });

        if (userData.lastUpdated) {
          setLastSaveDate(userData.lastUpdated.toDate());
        }
      } else {
        const initialData = {
          firstName: currentUser?.displayName?.split(' ')[0] || '',
          lastName: currentUser?.displayName?.split(' ').slice(1).join(' ') || '',
          username: '',
          location: '',
          description: '',
          profileImageUrl: currentUser?.photoURL || '',
          interests: []
        };
        setProfileData(initialData);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      alert('Error loading profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ NEW: Handle image URL input
  const handleImageUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      // Basic URL validation
      try {
        new URL(imageUrlInput);
        setProfileData(prev => ({
          ...prev,
          profileImageUrl: imageUrlInput.trim()
        }));
        setImageUrlInput('');
        setShowUrlInput(false);
      } catch (error) {
        alert('Please enter a valid URL');
      }
    }
  };

  // ✅ NEW: Validate image URL
  const validateImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  };

  // ✅ NEW: Handle preset image options (optional)
  const presetImages = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    // 'https://images.unsplash.com/photo-1494790108755-2616b612b524?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
  ];

  const handlePresetImage = (url) => {
    setProfileData(prev => ({
      ...prev,
      profileImageUrl: url
    }));
  };

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const canEdit30DayFields = () => {
    if (!lastSaveDate) return true;
    const daysDiff = (new Date() - lastSaveDate) / (1000 * 60 * 60 * 24);
    return daysDiff >= 30;
  };

  const canEditNameFields = () => {
    return !savedProfileData || (!savedProfileData.firstName && !savedProfileData.lastName);
  };

// This is the ONLY function you need to modify for the "profileImageUrl is not defined" error.
const handleSave = async () => {
  // ✅ FIX: Declare and initialize profileImageUrl at the very beginning of the function scope.
  // This ensures it's always defined, regardless of whether a new image is uploaded or not.
  let profileImageUrl = profileData.profileImageUrl;

  if (!currentUser) {
    alert('Please log in to save your profile');
    return;
  }

  // Validate image file if selected
  if (profileData.profileImage) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(profileData.profileImage.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    if (profileData.profileImage.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }
  }

  try {
    setSaving(true);
    const userId = currentUser.uid;
    const userDocRef = doc(db, 'users', userId);

    // If a new profile image file is selected, upload it and update profileImageUrl
    if (profileData.profileImage) {
      try {
        console.log('Uploading new profile image...');
        // The uploadProfileImage function you already have will return the URL.
        profileImageUrl = await uploadProfileImage(profileData.profileImage, userId);
        console.log('Image upload successful:', profileImageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
        alert(`Failed to upload image: ${error.message}`);
        setSaving(false);
        return; // Important: Exit if image upload fails
      }
    }

    // Prepare data to save. profileImageUrl is now guaranteed to be defined.
    const dataToSave = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      username: profileData.username,
      location: profileData.location,
      description: profileData.description,
      profileImageUrl: profileImageUrl, // This is now safe to use
      interests: profileData.interests,
      lastUpdated: new Date(),
      email: currentUser.email
    };

    // Save to Firestore
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      await updateDoc(userDocRef, dataToSave);
    } else {
      await setDoc(userDocRef, dataToSave);
    }

    // Update local state to reflect the saved data, including the potentially new image URL
    const currentDate = new Date();
    setSavedProfileData({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      username: profileData.username,
      location: profileData.location,
      description: profileData.description,
      profileImageUrl: profileImageUrl, // Use the updated URL
      interests: [...profileData.interests]
    });
    setLastSaveDate(currentDate);

    // Update profileData state for immediate UI reflection and to clear the file input
    setProfileData(prev => ({
      ...prev,
      profileImageUrl: profileImageUrl, // Update the URL in state
      profileImage: null // Clear the file object, as it's now uploaded
    }));

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);

  } catch (error) {
    console.error('Save profile error:', error);
    alert(`Error saving profile: ${error.message}`);
  } finally {
    setSaving(false);
  }
};

  const clearSavedData = async () => {
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await setDoc(userDocRef, {});
        loadUserProfile(currentUser.uid);
      } catch (error) {
        console.error('Failed to clear saved data:', error);
      }
    }
  };

  const handleBack = () => {
    navigate('/welcome-after-signup');
  };

  const handleChangePassword = () => {
    navigate('/profile/change-password');
  };

  const isFormValid = profileData.firstName && profileData.lastName && profileData.username;

  const getDaysUntilEdit = () => {
    if (!lastSaveDate || canEdit30DayFields()) return 0;
    const daysDiff = (new Date() - lastSaveDate) / (1000 * 60 * 60 * 24);
    return Math.ceil(30 - daysDiff);
  };

  const simulateTimePassing = async () => {
    if (lastSaveDate && currentUser) {
      try {
        const newDate = new Date(lastSaveDate);
        newDate.setDate(newDate.getDate() - 31);
        
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          lastUpdated: newDate
        });
        
        setLastSaveDate(newDate);
      } catch (error) {
        console.error('Error updating timestamp:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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

      {/* Header */}
      <div className="flex items-center px-6 py-4">
        <button onClick={handleBack} className="mr-4 hover:bg-gray-100 p-1 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mx-6 mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Profile saved successfully!
        </div>
      )}

      {/* Demo Controls */}
      {savedProfileData && (
        <div className="mx-6 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800 mb-2">Demo Controls:</div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={simulateTimePassing}
              className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Simulate 30+ days passed
            </button>
            <button
              onClick={clearSavedData}
              className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Clear all saved data
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-6 pb-6">
        {/* Profile Picture Section - UPDATED */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
              {profileData.profileImageUrl ? (
                <img
                  src={profileData.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-full h-full bg-orange-200 flex items-center justify-center ${profileData.profileImageUrl ? 'hidden' : ''}`}>
                <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Image URL Input Section */}
          {!showUrlInput ? (
            <div className="flex flex-col items-center space-y-2">
              <button 
                onClick={() => setShowUrlInput(true)}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Update picture via URL
              </button>
              <div className="text-xs text-gray-500">Enter an image URL</div>
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-3">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleImageUrlSubmit}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Set
                </button>
              </div>
              <button
                onClick={() => {
                  setShowUrlInput(false);
                  setImageUrlInput('');
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Preset Images (Optional) */}
          <div className="mt-4 w-full max-w-sm">
            <div className="text-xs text-gray-600 mb-2 text-center">Or choose a preset:</div>
            <div className="flex justify-center space-x-2">
              {presetImages.map((url, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetImage(url)}
                  className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors"
                >
                  <img
                    src={url}
                    alt={`Preset ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rest of the form remains the same... */}
        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              First name 
              {!canEditNameFields() && (
                <span className="text-sm text-red-500 ml-2">
                  <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
                  </svg>
                  Locked after first save
                </span>
              )}
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!canEditNameFields()}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                !canEditNameFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Last name 
              {!canEditNameFields() && (
                <span className="text-sm text-red-500 ml-2">
                  <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
                  </svg>
                  Locked after first save
                </span>
              )}
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!canEditNameFields()}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                !canEditNameFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Username 
              {!canEdit30DayFields() && (
                <span className="text-sm text-orange-500 ml-2">
                  <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Editable in {getDaysUntilEdit()} days
                </span>
              )}
            </label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={!canEdit30DayFields()}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                !canEdit30DayFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="text-gray-600 py-3 px-4 bg-gray-50 rounded-lg border">
              {currentUser?.email || 'Email not available'}
            </div>
            <div className="text-xs text-gray-500 mt-1">Email cannot be changed</div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location 
              {!canEdit30DayFields() && (
                <span className="text-sm text-orange-500 ml-2">
                  <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Editable in {getDaysUntilEdit()} days
                </span>
              )}
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              disabled={!canEdit30DayFields()}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                !canEdit30DayFields() ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
              <span className="text-sm text-green-500 ml-2">
                <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Can be changed anytime
              </span>
            </label>
            <textarea
              value={profileData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Write about yourself...."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Interests Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Interests
              {!canEdit30DayFields() && (
                <span className="text-sm text-orange-500 ml-2">
                  <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Editable in {getDaysUntilEdit()} days
                </span>
              )}
              {canEdit30DayFields() && (
                <span className="text-sm text-green-500 ml-2">
                  <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Select your interests
                </span>
              )}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => canEdit30DayFields() && handleInterestToggle(interest)}
                  disabled={!canEdit30DayFields()}
                  className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                    profileData.interests.includes(interest)
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  } ${
                    !canEdit30DayFields() 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'cursor-pointer transform hover:scale-105'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{interest}</span>
                    {profileData.interests.includes(interest) && (
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600">
                Selected: <span className="font-semibold text-blue-600">{profileData.interests.length}</span> interest{profileData.interests.length !== 1 ? 's' : ''}
              </div>
              {profileData.interests.length > 0 && (
                <div className="text-gray-500">
                  Max 10 interests recommended
                </div>
              )}
            </div>
            {profileData.interests.length > 0 && (
              <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-700 font-medium mb-1">Your interests:</div>
                <div className="flex flex-wrap gap-1">
                  {profileData.interests.map((interest) => (
                    <span key={interest} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

         {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 mt-8 mb-6 ${
            isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Save Changes
          </div>
        </button>

        {/* Profile Info Display */}
        {savedProfileData && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="font-bold text-gray-800">Saved Profile Summary</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-20">Name:</span>
                  <span className="text-gray-600">{savedProfileData.firstName} {savedProfileData.lastName}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-20">Username:</span>
                  <span className="text-gray-600">@{savedProfileData.username}</span>
                </div>
                {savedProfileData.location && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-20">Location:</span>
                    <span className="text-gray-600">{savedProfileData.location}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {savedProfileData.interests.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Interests:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {savedProfileData.interests.map((interest) => (
                        <span key={interest} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {lastSaveDate && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-24">Last saved:</span>
                    <span className="text-gray-600">{lastSaveDate.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Rules Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Edit Rules
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
              <span><strong>Names:</strong> Cannot be edited after first save</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
              <span><strong>Username, Location, Interests:</strong> Editable every 30 days</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span><strong>Description, Picture:</strong> Can be changed anytime</span>
            </div>
          </div>
        </div>

        {/* Change Password Link */}
        <button
          onClick={handleChangePassword}
          className="flex items-center justify-between w-full py-4 px-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-blue-600 font-medium">Change password</span>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;