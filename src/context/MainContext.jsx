import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import app from "../hooks/firebase.js";
export const Kalbela_AuthProvider = createContext();

const Provider = ({ children }) => {
      const [user, setUser] = useState('');
      const [loading, setLoading] = useState(false);
      const auth = getAuth(app);

      const googleProvider = new GoogleAuthProvider();

      const Google = () => {
            setLoading(true);
            signInWithPopup(auth, googleProvider)
                  .then((result) => {
                        // Extract user information
                        const user = result.user;

                        console.log(user, 'user');


                        // update_on_database(user);
                  })
                  .catch((error) => {
                        console.error("Error during Google login:", error);
                  })
                  .finally(() => {
                        setLoading(false);
                  });
      };


      const sign_up = (name, email, password, role, phone_number, profile_image) => {

      }




      useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                  setLoading(false);
                  setUser(user);
            });
            return () => {
                  setLoading(true);
                  unsubscribe();
            };
      }, []);



      const provider_object = { user, setUser, Google };



      return <Kalbela_AuthProvider.Provider value={provider_object}>{children}</Kalbela_AuthProvider.Provider>;
};

export default Provider;
