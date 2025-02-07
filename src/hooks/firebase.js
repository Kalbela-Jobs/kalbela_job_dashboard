// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
      apiKey: "AIzaSyDAa7je8Dx5PKtBLZX5jnT_VSPbr9px9TQ",
      authDomain: "auth.kalbelajobs.com",
      projectId: "kalbela-jobs-bd",
      storageBucket: "kalbela-jobs-bd.firebasestorage.app",
      messagingSenderId: "468184987683",
      appId: "1:468184987683:web:31656c3ffff1fd5c955996",
      measurementId: "G-EVB5C1613L"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
