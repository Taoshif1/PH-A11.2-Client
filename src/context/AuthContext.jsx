import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google login
  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Register
  const registerUser = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return updateProfile(res.user, { displayName: name }).then(() => {
          setUser({ ...res.user, displayName: name });
          return res.user;
        });
      });
  };

  // Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logOut = () => signOut(auth);

  // Handles memory leaks by placing listeners inside useEffect
  // Listen for auth state changes / set observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Cleanup observer / subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        googleSignIn, 
        loginUser, 
        registerUser, 
        logOut 
        }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
