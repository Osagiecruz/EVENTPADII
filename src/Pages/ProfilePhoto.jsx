// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { updateProfile } from 'firebase/auth';
// import { auth, storage } from '../firebase';
// import AuthLayout from '../AuthLayout';

// const ProfilePhoto = () => {
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleFileChange = (e) => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//             setPreview(URL.createObjectURL(e.target.files[0]));
//         }
//     };

//     const handleUpload = async () => {
//         if (!image) return;
        
//         const user = auth.currentUser;
//         if (!user) {
//             navigate('/login');
//             return;
//         }

//         setLoading(true);
//         const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        
//         try {
//             const snapshot = await uploadBytes(storageRef, image);
//             const photoURL = await getDownloadURL(snapshot.ref);
//             await updateProfile(user, { photoURL });
//             navigate('/all-set');
//         } catch (error) {
//             console.error("Error uploading photo:", error);
//             alert("Failed to upload photo.");
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     return (
//         <AuthLayout>
//             <div className="text-center">
//                 <h1 className="font-bold text-2xl mb-2">Add a Profile Photo</h1>
//                 <div className="mt-6 w-40 h-40 mx-auto rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
//                     {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover"/> : <span className='text-gray-500'>Preview</span>}
//                 </div>

//                 <label htmlFor="file-upload" className="cursor-pointer inline-block mt-6 py-3 px-8 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-900 transition-all">
//                     Upload Photo
//                 </label>
//                 <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*"/>
                
//                 {image && (
//                     <button onClick={handleUpload} disabled={loading} className="w-full mt-4 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 disabled:bg-green-400">
//                         {loading ? 'Uploading...' : 'Confirm and Continue'}
//                     </button>
//                 )}

//                 <button onClick={() => navigate('/all-set')} className="mt-4 text-sm text-gray-600 hover:text-blue-800">
//                     Skip for now
//                 </button>
//             </div>
//         </AuthLayout>
//     );
// };

// export default ProfilePhoto;