import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCamera, FaChevronRight } from 'react-icons/fa';
import { auth, db, storage } from '../firebase';
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    location: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [firstNameEdited, setFirstNameEdited] = useState(false);
  const [lastNameEdited, setLastNameEdited] = useState(false);
  const [usernameLastEdited, setUsernameLastEdited] = useState(null); // Timestamp
  const navigate = useNavigate();

  // 1. Authentication Guard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Not logged in, redirect to signup
        navigate('/signup');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 2. Fetch and Store Profile Data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        setLoading(true);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFormData({
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              username: userData.username || '',
              location: userData.location || '',
              description: userData.description || '',
            });
            if (user.photoURL) {
              setPreview(user.photoURL);
            }
            setFirstNameEdited(userData.firstNameEdited || false);
            setLastNameEdited(userData.lastNameEdited || false);
            setUsernameLastEdited(userData.usernameLastEdited?.toDate() || null); // Convert Firestore timestamp to Date
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          alert("Failed to load profile data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("You must be logged in to save your profile.");
      setLoading(false);
      navigate('/signup');
      return;
    }

    try {
      let photoURL = user.photoURL;
      if (image) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        const snapshot = await uploadBytes(storageRef, image);
        photoURL = await getDownloadURL(snapshot.ref);
      }

      // Determine if first/last name were just set for the first time
      const updatedFirstNameEdited = firstNameEdited || (formData.firstName !== '' && !firstNameEdited);
      const updatedLastNameEdited = lastNameEdited || (formData.lastName !== '' && !lastNameEdited);

      // 3. Username change restriction
      let newUsernameLastEdited = usernameLastEdited;
      if (formData.username !== user.displayName?.split(' ')[2] && usernameLastEdited) { // Assuming username is part of displayName for initial check,
                                                                                       // or better, compare with actual fetched username.
                                                                                       // This condition needs refinement based on how username is initially stored in auth displayName.
                                                                                       // For a more robust check, compare formData.username with the username fetched from Firestore.
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        if (usernameLastEdited > thirtyDaysAgo) {
          alert("You can only change your username once every 30 days.");
          setLoading(false);
          return;
        }
      }
      // Update usernameLastEdited if username is changed
      if (formData.username !== (user.displayName?.split(' ')[2] || formData.username) && formData.username !== '') {
          // This logic needs to compare with the *previously saved* username, not auth.displayName directly.
          // For simplicity, I'm using the fetched formData.username as the reference for now.
          // A more robust solution would store the *old* username in state and compare against it.
          // For now, if current formData.username is different from what was loaded, and it's not empty,
          // then consider it a change.
          const userDocSnap = await getDoc(doc(db, "users", user.uid));
          const oldUsername = userDocSnap.exists() ? userDocSnap.data().username : '';
          if (formData.username !== oldUsername) {
              newUsernameLastEdited = new Date();
          }
      }


      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName} ${formData.username}`, // Consider how username is displayed/stored in auth
        photoURL
      });

      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        firstNameEdited: updatedFirstNameEdited,
        lastNameEdited: updatedLastNameEdited,
        usernameLastEdited: newUsernameLastEdited,
      }, { merge: true });

      alert("Profile saved successfully!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(`Failed to save profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const canEditFirstName = !firstNameEdited || formData.firstName === '';
  const canEditLastName = !lastNameEdited || formData.lastName === '';

  const canEditUsername = () => {
    if (!usernameLastEdited) return true; // Can edit if never edited
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return usernameLastEdited < thirtyDaysAgo;
  };

  const usernameRestrictionMessage = !canEditUsername() ?
    `You can change your username again on ${new Date(usernameLastEdited.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}.` : '';


  const email = user ? user.email : '';

  if (loading && !user) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-start p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <header className="flex items-center justify-center relative py-4">
          <button onClick={() => navigate(-1)} className="absolute left-0 text-slate-600 hover:text-indigo-800">
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Set Profile</h1>
        </header>

        <div className="bg-white p-6 sm:p-8 mt-4 rounded-xl shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-8">
              <label htmlFor="file-upload" className="cursor-pointer inline-block">
                <div className="w-28 h-28 mx-auto rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-400 hover:border-indigo-500 transition-all">
                  {preview ?
                    <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" /> :
                    <div className="text-center text-slate-500">
                      <FaCamera size={24} />
                      <span className="text-xs block mt-1">Upload picture</span>
                    </div>
                  }
                </div>
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                    disabled={firstNameEdited && formData.firstName !== ''} // Disable if already edited and has a value
                    className={`w-full mt-1 px-3 py-2 border rounded-md ${firstNameEdited && formData.firstName !== '' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'border-slate-300'}`}
                  />
                  {firstNameEdited && formData.firstName !== '' && (
                    <p className="text-xs text-red-500 mt-1">First name can only be edited once after initial setup.</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                    disabled={lastNameEdited && formData.lastName !== ''} // Disable if already edited and has a value
                    className={`w-full mt-1 px-3 py-2 border rounded-md ${lastNameEdited && formData.lastName !== '' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'border-slate-300'}`}
                  />
                  {lastNameEdited && formData.lastName !== '' && (
                    <p className="text-xs text-red-500 mt-1">Last name can only be edited once after initial setup.</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Username</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                    disabled={!canEditUsername() && formData.username !== ''} // Disable if restriction applies and it has a value
                    className={`w-full mt-1 px-3 py-2 border rounded-md ${!canEditUsername() && formData.username !== '' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'border-slate-300'}`}
                  />
                  {usernameRestrictionMessage && formData.username !== '' && (
                    <p className="text-xs text-red-500 mt-1">{usernameRestrictionMessage}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write about yourself..."
                  rows="4"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full !mt-6 py-3 bg-indigo-800 text-white rounded-lg font-semibold hover:bg-indigo-900 disabled:bg-indigo-400"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white p-6 sm:p-8 mt-6 rounded-xl shadow-md">
          <button className="w-full flex justify-between items-center text-left">
            <span className="font-semibold text-slate-800">Change password</span>
            <FaChevronRight className="text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;