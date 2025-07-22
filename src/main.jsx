import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './Store/index.js'
import App from './App.jsx'
import './index.css'

// Import Capacitor
import { Capacitor } from '@capacitor/core'

// Initialize Capacitor when running on mobile
if (Capacitor.isNativePlatform()) {
  // Any native-specific initialization can go here
  console.log('Running on native platform:', Capacitor.getPlatform())
} else {
  console.log('Running on web platform')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)