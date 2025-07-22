import React from 'react'
import { useLocation } from 'react-router-dom'
// import BottomNavigation from './BottomNavigation'

const MobileLayout = ({ children }) => {
  const location = useLocation()
  
  // Pages that should show the bottom navigation
  const showBottomNav = ['/', '/search', '/chat', '/profile'].includes(location.pathname)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content area */}
      <main className={`flex-1 ${showBottomNav ? 'pb-16' : ''}`}>
        {children}
      </main>
      
      {/* Bottom navigation */}
      {showBottomNav && <BottomNavigation />}
    </div>
  )
}

export default MobileLayout