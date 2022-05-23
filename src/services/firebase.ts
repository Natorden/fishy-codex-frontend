import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// get config from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAOtNCAEOjG5ge6W8_WTKAXv1dOOn2fJbg",
  authDomain: "fishycodexv2.firebaseapp.com",
  databaseURL:
    "https://fishycodexv2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fishycodexv2",
  storageBucket: "fishycodexv2.appspot.com",
  messagingSenderId: "515925018972",
  appId: "1:515925018972:web:d8a6ed7ab653fbef8c5999",
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
