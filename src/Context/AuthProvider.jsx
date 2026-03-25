import React, { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    updateProfile 
} from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic'; 

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic(); 

    const withAuthLoading = async (action) => {
        setLoading(true);
        try {
            return await action();
        } finally {
        }
    };

    const createUser = (email, password) => {
        return withAuthLoading(() => createUserWithEmailAndPassword(auth, email, password));
    };

    const updateUserProfile = (name, photo) => {
        return withAuthLoading(() => updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        }));
    };

    const userLogin = (email, password) => {
        return withAuthLoading(() => signInWithEmailAndPassword(auth, email, password));
    };

    const googleLogin = () => {
        return withAuthLoading(() => signInWithPopup(auth, googleProvider));
    };

    const logOut = () => {
        return withAuthLoading(() => signOut(auth));
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
                    .catch(err => {
                        console.error("JWT Error:", err);
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }

            console.log('Current User State:', currentUser);
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
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