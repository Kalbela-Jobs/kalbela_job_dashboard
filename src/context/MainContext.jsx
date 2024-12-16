import {
      createUserWithEmailAndPassword,
      getAuth,
      GithubAuthProvider,
      GoogleAuthProvider,
      onAuthStateChanged,
      sendPasswordResetEmail,
      signInWithEmailAndPassword,
      signInWithPopup,
      signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../hooks/firebase.js";

export const Kalbela_AuthProvider = createContext();

const Provider = ({ children }) => {
      const [user, setUser] = useState("");
      const [loading, setLoading] = useState(false);

      const base_url = import.meta.env.BASE_URL

      const auth = getAuth(app);

      const googleProvider = new GoogleAuthProvider();

      const googleLogin = () => {
            setLoading(true);
            return signInWithPopup(auth, googleProvider);
      };

      // singOut
      const loginOut = () => {
            setLoading(true);
            return signOut(auth);
      };

      const sign_up = (
            name,
            email,
            password,
            role,
            phone_number,
            profile_image
      ) => { };




      // Function to save user data in IndexedDB
      const setCookie = (name, value, days) => {
            const valueString = JSON.stringify(value);
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = `${name}=${encodeURIComponent(valueString)}; expires=${expires}; path=/`;
      };

      const getCookie = (name) => {
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                  const [cookieName, cookieValue] = cookie.trim().split('=');
                  if (cookieName === name) {
                        return decodeURIComponent(cookieValue);
                  }
            }
            return null;
      };
      const checkShopCookie = () => {
            const userCookie = getCookie('kal_bela_jobs_user');
            if (userCookie) {
                  const userData = JSON.parse(userCookie);
                  setUser(userData);
            }
            setLoading(false);
      };

      useEffect(() => {
            const unsubscribe = () => {
                  // checkUserCookie();
                  checkShopCookie();
            };

            unsubscribe();

            return () => {

            };
      }, []);

      const provider_object = { user, setUser, googleLogin, loading, loginOut, base_url, setCookie };

      return (
            <Kalbela_AuthProvider.Provider value={provider_object}>
                  {children}
            </Kalbela_AuthProvider.Provider>
      );
};

export default Provider;
