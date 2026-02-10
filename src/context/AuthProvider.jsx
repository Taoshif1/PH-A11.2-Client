import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // For MongoDB data
  const [loading, setLoading] = useState(true);

  // Register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update Profile
  const updateUserProfile = (profile, name, photo) => {
    return (
      updateProfile(auth.currentUser, profile),
      {
        displayName: name,
        photoURL: photo,
      }
    );
  };
  // Logout
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          setUserInfo(res.data);
        } catch (err) {
          console.error("Error fetching user role", err);
        }
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    userInfo,
    loading,
    registerUser,
    loginUser,
    googleSignIn,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
