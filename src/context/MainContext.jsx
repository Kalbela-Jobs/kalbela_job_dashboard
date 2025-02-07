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
      const [workspace, setWorkspace] = useState("");
      const [loading, setLoading] = useState(true);
      const base_url = import.meta.env.VITE_BASE_URL
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();

      const googleLogin = () => {
            setLoading(true);
            return signInWithPopup(auth, googleProvider);
      };

      const removeCookie = (cookieName) => {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      };


      const loginOut = () => {
            // Clear application state
            setWorkspace('');
            setUser('');

            // Firebase signOut
            signOut(auth);

            // Remove cookies
            removeCookie('kal_bela_jobs_user');
            removeCookie('kal_bela_jobs_workspace');

            // Set loading to false
            setLoading(false);
      };



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
      const checkUserCookie = () => {
            setLoading(true);
            const userCookie = getCookie('kal_bela_jobs_user');
            if (userCookie) {
                  const userData = JSON.parse(userCookie);
                  setUser(userData);
            }
            setLoading(false);
      };
      const check_workspace_cookie = () => {
            setLoading(true);
            const workspaceCookie = getCookie('kal_bela_jobs_workspace');
            if (workspaceCookie) {
                  const workspaceData = JSON.parse(workspaceCookie);
                  setWorkspace(workspaceData);
            }
            setLoading(false);
      };

      useEffect(() => {
            const unsubscribe = () => {
                  setLoading(true);
                  checkUserCookie();
                  check_workspace_cookie();
                  setLoading(false);
            };

            unsubscribe();

            return () => {
                  setLoading(false);
            };
      }, []);

      const provider_object = { user, setUser, googleLogin, loading, loginOut, base_url, setCookie, workspace, setWorkspace };

      return (
            <Kalbela_AuthProvider.Provider value={provider_object}>
                  {children}
            </Kalbela_AuthProvider.Provider>
      );
};

export default Provider;
