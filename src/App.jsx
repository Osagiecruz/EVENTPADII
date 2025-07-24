// import React from 'react'
// import SignUp from './Pages/SignUp'

// const App = () => {
//   return (
//     <div>
//       <SignUp />
//     </div>
//   );
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import CreatePassword from './Pages/CreatePassword';
import VerifyEmail from './Pages/VerifyEmail';
import Welcome from './Pages/Welcome';
import CompleteProfile from './Pages/CompleteProfile';
import Login from './Pages/Login';
import AuthLayout from './AuthLayout'
// import ProfilePhoto from './Pages/ProfilePhoto';
// import AllSet from './Pages/AllSet';
// Import your main dashboard component
// import Dashboard from './pages/Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth-layout" element={<AuthLayout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        {/* <Route path="/profile-photo" element={<ProfilePhoto />} />
        <Route path="/all-set" element={<AllSet />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/" element={<SignUp />} /> 
      </Routes>
    </Router>
  );
}

export default App;