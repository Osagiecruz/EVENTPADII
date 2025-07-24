// import { Capacitor } from '@capacitor/core';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Geolocation } from '@capacitor/geolocation';
// import { PushNotifications } from '@capacitor/push-notifications';
// import { LocalNotifications } from '@capacitor/local-notifications';
// import { Share } from '@capacitor/share';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Device } from '@capacitor/device';
// import { Network } from '@capacitor/network';
// import { StatusBar, Style } from '@capacitor/status-bar';
// import { SplashScreen } from '@capacitor/splash-screen';
// import { Haptics, ImpactStyle } from '@capacitor/haptics';
// import { Keyboard } from '@capacitor/keyboard';
// import { App } from '@capacitor/app';

// // Check if running on native platform
// export const isNative = Capacitor.isNativePlatform();
// export const platform = Capacitor.getPlatform();

// // Camera functionality
// export const capturePhoto = async (options = {}) => {
//   if (!isNative) {
//     // Fallback for web
//     return await capturePhotoWeb();
//   }

//   try {
//     const photo = await Camera.getPhoto({
//       quality: 90,
//       allowEditing: false,
//       resultType: CameraResultType.DataUrl,
//       source: CameraSource.Camera,
//       ...options
//     });
//     return photo;
//   } catch (error) {
//     console.error('Error capturing photo:', error);
//     throw error;
//   }
// };

// export const selectPhoto = async (options = {}) => {
//   if (!isNative) {
//     return await selectPhotoWeb();
//   }

//   try {
//     const photo = await Camera.getPhoto({
//       quality: 90,
//       allowEditing: false,
//       resultType: CameraResultType.DataUrl,
//       source: CameraSource.Photos,
//       ...options
//     });
//     return photo;
//   } catch (error) {
//     console.error('Error selecting photo:', error);
//     throw error;
//   }
// };

// // Web fallbacks for camera
// const capturePhotoWeb = () => {
//   return new Promise((resolve, reject) => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.capture = 'environment';
    
//     input.onchange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           resolve({
//             dataUrl: e.target.result,
//             format: file.type.split('/')[1]
//           });
//         };
//         reader.readAsDataURL(file);
//       } else {
//         reject(new Error('No file selected'));
//       }
//     };
    
//     input.click();
//   });
// };

// const selectPhotoWeb = () => {
//   return new Promise((resolve, reject) => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
    
//     input.onchange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           resolve({
//             dataUrl: e.target.result,
//             format: file.type.split('/')[1]
//           });
//         };
//         reader.readAsDataURL(file);
//       } else {
//         reject(new Error('No file selected'));
//       }
//     };
    
//     input.click();
//   });
// };

// // Geolocation functionality
// export const getCurrentPosition = async (options = {}) => {
//   if (!isNative) {
//     return await getCurrentPositionWeb(options);
//   }

//   try {
//     const position = await Geolocation.getCurrentPosition({
//       enableHighAccuracy: true,
//       timeout: 10000,
//       ...options
//     });
//     return position;
//   } catch (error) {
//     console.error('Error getting location:', error);
//     throw error;
//   }
// };

// const getCurrentPositionWeb = (options = {}) => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation not supported'));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           coords: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy,
//             altitude: position.coords.altitude,
//             altitudeAccuracy: position.coords.altitudeAccuracy,
//             heading: position.coords.heading,
//             speed: position.coords.speed
//           },
//           timestamp: position.timestamp
//         });
//       },
//       (error) => reject(error),
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 300000,
//         ...options
//       }
//     );
//   });
// };

// // Push Notifications
// export const initializePushNotifications = async () => {
//   if (!isNative) return;

//   try {
//     const permission = await PushNotifications.requestPermissions();
//     if (permission.receive === 'granted') {
//       await PushNotifications.register();
//     }
//   } catch (error) {
//     console.error('Error initializing push notifications:', error);
//   }
// };

// export const scheduleLocalNotification = async (notification) => {
//   if (!isNative) return;

//   try {
//     await LocalNotifications.schedule({
//       notifications: [notification]
//     });
//   } catch (error) {
//     console.error('Error scheduling notification:', error);
//   }
// };

// // Share functionality
// export const shareContent = async (content) => {
//   if (!isNative) {
//     return await shareContentWeb(content);
//   }

//   try {
//     await Share.share(content);
//   } catch (error) {
//     console.error('Error sharing content:', error);
//     throw error;
//   }
// };

// const shareContentWeb = async (content) => {
//   if (navigator.share) {
//     try {
//       await navigator.share(content);
//     } catch (error) {
//       console.error('Error sharing:', error);
//     }
//   } else {
//     // Fallback - copy to clipboard
//     if (content.text) {
//       await navigator.clipboard.writeText(content.text);
//       alert('Content copied to clipboard');
//     }
//   }
// };

// // Haptic feedback
// export const triggerHaptic = async (style = ImpactStyle.Light) => {
//   if (!isNative) return;

//   try {
//     await Haptics.impact({ style });
//   } catch (error) {
//     console.error('Error triggering haptic:', error);
//   }
// };

// // Network status
// export const getNetworkStatus = async () => {
//   if (!isNative) {
//     return { connected: navigator.onLine };
//   }

//   try {
//     const status = await Network.getStatus();
//     return status;
//   } catch (error) {
//     console.error('Error getting network status:', error);
//     return { connected: false };
//   }
// };

// // Device info
// export const getDeviceInfo = async () => {
//   if (!isNative) {
//     return {
//       platform: 'web',
//       model: navigator.userAgent,
//       operatingSystem: navigator.platform,
//       isVirtual: false
//     };
//   }

//   try {
//     const info = await Device.getInfo();
//     return info;
//   } catch (error) {
//     console.error('Error getting device info:', error);
//     return null;
//   }
// };

// // Status bar
// export const setStatusBarStyle = async (style = Style.Dark) => {
//   if (!isNative) return;

//   try {
//     await StatusBar.setStyle({ style });
//   } catch (error) {
//     console.error('Error setting status bar style:', error);
//   }
// };

// // Splash screen
// export const hideSplashScreen = async () => {
//   if (!isNative) return;

//   try {
//     await SplashScreen.hide();
//   } catch (error) {
//     console.error('Error hiding splash screen:', error);
//   }
// };

// // Keyboard
// export const hideKeyboard = async () => {
//   if (!isNative) return;

//   try {
//     await Keyboard.hide();
//   } catch (error) {
//     console.error('Error hiding keyboard:', error);
//   }
// };

// // App state
// export const addAppStateListener = (callback) => {
//   if (!isNative) return () => {};

//   const listener = App.addListener('appStateChange', callback);
//   return () => listener.remove();
// };

// export default {
//   isNative,
//   platform,
//   capturePhoto,
//   selectPhoto,
//   getCurrentPosition,
//   initializePushNotifications,
//   scheduleLocalNotification,
//   shareContent,
//   triggerHaptic,
//   getNetworkStatus,
//   getDeviceInfo,
//   setStatusBarStyle,
//   hideSplashScreen,
//   hideKeyboard,
//   addAppStateListener
// };