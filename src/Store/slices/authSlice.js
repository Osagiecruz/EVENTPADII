import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/services/firebase/config';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false, // ✅ Add this property
  loading: false,
  error: null,
};

// Async thunks
export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        emailVerified: userCredential.user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
        photoURL: userCredential.user.photoURL,
        emailVerified: userCredential.user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add logout thunk
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add thunk to check auth state
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue, getState }) => {
    try {
      const currentState = getState().auth;
      
      // If we already have a user and are authenticated, don't override
      if (currentState.user && currentState.isAuthenticated) {
        console.log('checkAuthStatus: Already authenticated, skipping check');
        return currentState.user;
      }

      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          console.log('checkAuthStatus: Timeout reached, resolving with current user or null');
          unsubscribe();
          // If we timeout, resolve with current user if exists, otherwise null
          resolve(currentState.user || null);
        }, 5000); // 5 second timeout

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          clearTimeout(timeoutId);
          unsubscribe();
          
          if (user) {
            console.log('checkAuthStatus: User found:', user.email);
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          } else {
            console.log('checkAuthStatus: No user found');
            resolve(null);
          }
        }, (error) => {
          clearTimeout(timeoutId);
          unsubscribe();
          console.error('checkAuthStatus: Error:', error);
          reject(error);
        });
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// The slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false; // ✅ Update isAuthenticated
      state.error = null;
      state.loading = false;
    },
    // ✅ Add reducer to set auth state manually if needed
    setAuthState: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
    },
    // ✅ Add reducer to prevent unnecessary loading states
    skipAuthCheck: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in with email cases
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // ✅ Set to true when login succeeds
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false; // ✅ Set to false when login fails
      })
      
      // Sign up with email cases
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // ✅ Set to true when signup succeeds
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false; // ✅ Set to false when signup fails
      })
      
      // Sign in with Google cases
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // ✅ Set to true when Google login succeeds
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false; // ✅ Set to false when Google login fails
      })
      
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false; // ✅ Set to false when logout succeeds
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Don't change auth state on logout error
      })
      
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        // Only set loading if we don't already have a user
        if (!state.user) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Only update if the payload is different from current user
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else if (!state.user) {
          // Only set to null if we didn't have a user before
          state.user = null;
          state.isAuthenticated = false;
        }
        // If we had a user and payload is null, keep the existing user
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Don't reset auth state on error if we already have a user
        if (!state.user) {
          state.isAuthenticated = false;
        }
      });
  },
});

// Export actions
export const { logoutSuccess, setAuthState, skipAuthCheck } = authSlice.actions;

// ✅ Export the reducer as default
export default authSlice.reducer;