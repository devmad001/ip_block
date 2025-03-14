import api from "../api/axios";
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const authService = {
    getStoredToken: () => localStorage.getItem("token"),
    setAuthHeader: (token) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    clearAuthHeader: () => {
        delete api.defaults.headers.common["Authorization"];
    },
    storeToken: (token) => {
        localStorage.setItem("token", token);
    },
    clearToken: () => {
        localStorage.removeItem("token");
    },
    fetchUser: async (token) => {
        const { data } = await api.get("/api/v1/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.user;
    },
    // Sign in with Google
    signInWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();

            // Send the token to our backend
            const response = await api.post('/api/v1/auth/google', { idToken });
            const { token, user } = response.data;

            // Store the JWT token from our backend
            authService.storeToken(token);
            authService.setAuthHeader(token);

            return user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    },
    // Sign out
    signOut: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    },
    // Get current user
    getCurrentUser: () => {
        return auth.currentUser;
    },
    // Subscribe to auth state changes
    onAuthStateChanged: (callback) => {
        return onAuthStateChanged(auth, callback);
    }
};
