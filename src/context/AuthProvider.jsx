// AuthProvider.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Listeners MUST be in useEffect to prevent memory leaks
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe(); // Cleanup
    }, []);

    const authInfo = { 
        user, 
        loading, 
        logout: () => signOut(auth) };

    return (
        <AuthContext value={authInfo}> {/* React 19 Syntax */}
            {children}
        </AuthContext>
    );
};