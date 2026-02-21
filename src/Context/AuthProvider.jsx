import React, { useEffect, useState } from 'react';
import { AuthContext } from './CreateContext';
import { auth } from '../Firebase/Authinit';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';



const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // google provider 
    const googleProvider = new GoogleAuthProvider();

    // sign in
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Register
    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // SignOut
    const SignOut = () => {
    return signOut(auth);
    };

    // sign in with google
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const Update = (user, name, photoURL) => {
        return updateProfile();
    }




    useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    })
    return () => unSubscribe();
}, []);

    const authInfo = {
        loading,
        googleProvider,
        user,
        setUser,
        signIn,
        register,
        SignOut,
        updateProfile,
        signInWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
                {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;