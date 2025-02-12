import {
      createUserWithEmailAndPassword,
      getAuth,
      getRedirectResult,
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
import sweet_alert from "../utils/custom_alert.js";

export const Kalbela_AuthProvider = createContext();

const Provider = ({ children }) => {
      const [user, setUser] = useState("");
      const [workspace, setWorkspace] = useState("");
      const [loading, setLoading] = useState(true);
      const base_url = import.meta.env.VITE_BASE_URL
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();

      const googleLogin = async () => {
            setLoading(true);
            try {
                  const result = await signInWithPopup(auth, googleProvider);
                  console.log(result.user, "result googleLogin");
                  if (result.user) {
                        const data = {
                              name: result.user?.displayName,
                              email: result.user?.email,
                              profile_picture: result?.user?.photoURL
                        }
                        fetch(`${base_url}/auth/sign-in-with-google-hr`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify(data)
                        }).then((res) => res.json())
                              .then((data) => {
                                    if (!data.error) {
                                          setUser(data.data.user);
                                          setCookie("kal_bela_jobs_user", data.data.user, 365);
                                          if (data.data.workspace) {
                                                setWorkspace(data.data.workspace);
                                                setCookie('kal_bela_jobs_workspace', data.data.workspace, 365);
                                          }
                                          else (
                                                window.location.href = "/create-workspace"
                                          )
                                          sweet_alert("Success", data.message, "success");
                                    }
                                    else {
                                          sweet_alert("Error", data.message, "error");
                                    }
                              })
                  }

            } catch (error) {
                  throw error;
            } finally {
                  setLoading(false);
            }
      };

      const handleRedirectResult = async () => {
            try {
                  const result = await getRedirectResult(auth);
                  console.log(result, "result");
                  if (result) {
                        setUser(result.user);
                        console.log(result.user, "result.user");
                  } else {
                        console.log("No result from redirect");
                  }
            } catch (error) {
                  console.error("Error during redirect:", error.message);
            }
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

      const provider_object = { user, setUser, googleLogin, handleRedirectResult, loading, loginOut, base_url, setCookie, workspace, setWorkspace };

      return (
            <Kalbela_AuthProvider.Provider value={provider_object}>
                  {children}
            </Kalbela_AuthProvider.Provider>
      );
};

export default Provider;
