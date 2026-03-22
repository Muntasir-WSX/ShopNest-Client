import React, { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    updateProfile // Profile update করার জন্য এটি প্রয়োজন
} from "firebase/auth";
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper to safely manage auth loading for each async method
    const withAuthLoading = async (action) => {
        setLoading(true);
        try {
            return await action();
        } finally {
            setLoading(false);
        }
    };

    // new user sign up function
    const createUser = (email, password) => {
        return withAuthLoading(() => createUserWithEmailAndPassword(auth, email, password));
    };

    // user update function
    const updateUserProfile = (name, photo) => {
        return withAuthLoading(() => updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        }));
    };

    // user login function
    const userLogin = (email, password) => {
        return withAuthLoading(() => signInWithEmailAndPassword(auth, email, password));
    };

    // google login function
    const googleLogin = () => {
        return withAuthLoading(() => signInWithPopup(auth, googleProvider));
    };

    // logout function
    const logOut = () => {
        return withAuthLoading(() => signOut(auth));
    };

    // onAuthStateChanged for login state tracking
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log('Current User State:', currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile, // এখানে এক্সপোর্ট করে দেওয়া হলো
        userLogin,
        googleLogin,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;