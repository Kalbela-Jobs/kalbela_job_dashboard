// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
      apiKey: "AIzaSyAI4yUlQCiVnTIRdXX0kZnnfigsuFRiJ1A",
      authDomain: "kalbelajobsbd.firebaseapp.com",
      projectId: "kalbelajobsbd",
      storageBucket: "kalbelajobsbd.firebasestorage.app",
      messagingSenderId: "19554497108",
      appId: "1:19554497108:web:6de3e7d19e260612f4b3c1",
      measurementId: "G-4LETLJCM01"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
