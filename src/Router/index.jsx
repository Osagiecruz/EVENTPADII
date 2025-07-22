import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Layout components
import MobileLayout from '../components/layout/MobileLayout'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import PublicRoute from '../Components/Layout/PublicRoute'

// Auth pages
import SplashPage from '../pages/auth/SplashPage'
import WelcomePage from '../pages/auth/WelcomePage'
import SignupPage from '../pages/auth/SignupPage'
import LoginPage from '../pages/auth/LoginPage'
import WelcomePageAfterSignup from '../Pages/auth/WelcomePageAfterSignup'
// import EmailVerification from '../Components/Forms/EmailVerification'
import VerifyEmailPage from '../Components/Forms/VerifyEmailPage' 
// import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
// import ResetPasswordPage from '../pages/auth/ResetPasswordPage'

// Main app pages
// import HomePage from '../pages/home/HomePage'
// import SearchPage from '../pages/search/SearchPage'
// import ChatPage from '../pages/chat/ChatPage'
// import ProfilePage from '../pages/profile/ProfilePage'
// import SettingsPage from '../pages/settings/SettingsPage'

// Event pages
// import EventDetailsPage from '../pages/events/EventDetailsPage'
// import CreateEventPage from '../pages/events/CreateEventPage'
// import EditEventPage from '../pages/events/EditEventPage'
// import MyEventsPage from '../pages/events/MyEventsPage'

// Profile pages
import EditProfilePage from '../Pages/profile/EditProfilePage'
// import ViewProfilePage from '../Pages/profile/ViewProfilePage'
import ChangePasswordPage from '../Pages/profile/ChangePasswordPage' // 🆕 NEW IMPORT

// Chat pages
// import ChatListPage from '../pages/chat/ChatListPage'
// import ChatDetailsPage from '../pages/chat/ChatDetailsPage'

// Error pages
// import NotFoundPage from '../pages/error/NotFoundPage'
// import ErrorPage from '../pages/error/ErrorPage'

// ✅ Loading component that doesn't use navigation hooks
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">EventPadi</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
};

// Root component to handle authentication-based routing
const RootRoute = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  
  return (
    <Navigate 
      to={isAuthenticated ? "/" : "/welcome"} 
      replace 
    />
  )
}

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    // errorElement: <ErrorPage />,
  },
  
  // Public routes (authentication pages)
  {
    path: "/splash",
    element: (
      <PublicRoute>
        <SplashPage />
      </PublicRoute>
    ),
  },
  {
    path: "/welcome",
    element: (
      <PublicRoute>
        <WelcomePage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <PublicRoute>
        <VerifyEmailPage />
      </PublicRoute>
    ),
  },
  {
    path: "/welcome-after-signup",
    element: (
      <ProtectedRoute>
        <WelcomePageAfterSignup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        {/* <ForgotPasswordPage /> */}
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute>
        {/* <ResetPasswordPage /> */}
      </PublicRoute>
    ),
  },
  
  // Protected routes with mobile layout
  // {
  //   path: "/home",
  //   element: (
  //     <ProtectedRoute>
  //       <MobileLayout>
  //         <HomePage />
  //       </MobileLayout>
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/search",
  //   element: (
  //     <ProtectedRoute>
  //       <MobileLayout>
  //         <SearchPage />
  //       </MobileLayout>
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/chat",
  //   element: (
  //     <ProtectedRoute>
  //       <MobileLayout>
  //         <ChatListPage />
  //       </MobileLayout>
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/chat/:chatId",
  //   element: (
  //     <ProtectedRoute>
  //       <ChatDetailsPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/profile",
  //   element: (
  //     <ProtectedRoute>
  //       <MobileLayout>
  //         <ProfilePage />
  //       </MobileLayout>
  //     </ProtectedRoute>
  //   ),
  // },
  
  // Event routes
  // {
  //   path: "/events/:eventId",
  //   element: (
  //     <ProtectedRoute>
  //       <EventDetailsPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/events/create",
  //   element: (
  //     <ProtectedRoute>
  //       <CreateEventPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/events/:eventId/edit",
  //   element: (
  //     <ProtectedRoute>
  //       <EditEventPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/my-events",
  //   element: (
  //     <ProtectedRoute>
  //       <MobileLayout>
  //         <MyEventsPage />
  //       </MobileLayout>
  //     </ProtectedRoute>
  //   ),
  // },
  
  // Profile routes
  {
    path: "/profile/edit",
    element: (
      <ProtectedRoute>
        <EditProfilePage />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/profile/:userId",
  //   element: (
  //     <ProtectedRoute>
  //       <ViewProfilePage />
  //     </ProtectedRoute>
  //   ),
  // },
  // 🆕 NEW ROUTE - Change Password
  {
    path: "/profile/change-password",
    element: (
      <ProtectedRoute>
        <ChangePasswordPage />
      </ProtectedRoute>
    ),
  },
  
  // Settings routes
  // {
  //   path: "/settings",
  //   element: (
  //     <ProtectedRoute>
  //       <SettingsPage />
  //     </ProtectedRoute>
  //   ),
  // },
  
  // Catch all route
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
]);

// ✅ Router component that handles loading state
const AppRouter = () => {
  const authState = useSelector(state => {
    console.log('Router - Full auth state:', state.auth) // Debug log
    return state.auth
  });
  
  const { loading, isAuthenticated, user, error } = authState;
  
  console.log('Router render - loading:', loading, 'isAuthenticated:', isAuthenticated)
  
  // ✅ Add timeout fallback - if loading for more than 10 seconds, show content anyway
  const [forceShow, setForceShow] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Loading timeout reached, forcing show...')
      setForceShow(true)
    }, 10000); // 10 seconds timeout
    
    return () => clearTimeout(timer)
  }, [])
  
  // Show loading page if still checking auth status (unless timeout reached)
  if (loading && !forceShow) {
    return <LoadingPage />;
  }
  
  // Once loading is complete (or timeout reached), show the router
  return <RouterProvider router={router} />
}

export default AppRouter
export { router }