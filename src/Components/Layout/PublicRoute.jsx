import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If user is authenticated, redirect to home
  // Otherwise, show the public route (login, signup, etc.)
//   return isAuthenticated ? <Navigate to="/" replace /> : children
// }
  // If user is authenticated and trying to access login/signup pages, redirect them
  if (isAuthenticated) {
    return <Navigate to="/welcome-after-signup" replace />;
  }

  // If not authenticated, show the public page
  return children;
};

export default PublicRoute