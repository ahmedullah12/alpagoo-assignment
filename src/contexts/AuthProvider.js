import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();


    const signUpWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    };

    const updateUser = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    };

    const logOut = () => {
        return signOut(auth)
    };

    const saveUser = (name, email) =>{
        const user = {name, email};
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
        })
        .catch(err => {})
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);  
        });

        return () =>  unsubscribe();
    }, [])


    const authInfo = {
        signUpWithEmail, loginWithEmail, googleSignIn, logOut,updateUser,saveUser, user, loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;