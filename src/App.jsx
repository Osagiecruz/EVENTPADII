import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Capacitor imports
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'

// Router
import AppRouter from './Router/index'

// Components
import SplashPage from './pages/auth/SplashPage'

// ✅ Import the actions we need
import { checkAuthStatus, skipAuthCheck } from './Store/slices/authSlice' // Update path as needed

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, loading, user } = useSelector(state => state.auth)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    // Configure native features if running on mobile
    if (Capacitor.isNativePlatform()) {
      try {
        // Configure status bar
        await StatusBar.setStyle({ style: Style.Default })
        await StatusBar.setBackgroundColor({ color: '#ffffff' })
        
        // Hide splash screen after app is loaded
        await SplashScreen.hide()
      } catch (error) {
        console.error('Native initialization error:', error)
      }
    }

    // ✅ Only check auth status if we don't already have a user
    if (!user && !isAuthenticated) {
      console.log('App: Checking auth status...')
      dispatch(checkAuthStatus())
    } else {
      console.log('App: User already authenticated, skipping auth check')
      dispatch(skipAuthCheck())
    }
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      <AppRouter />
    </div>
  )
}

export default App