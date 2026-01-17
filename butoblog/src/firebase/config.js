import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0g1BEHDkngor5i9PWHsI3_sn2dnsQ5mg",
  authDomain: "mybulog-64d97.firebaseapp.com",
  projectId: "mybulog-64d97",
  storageBucket: "mybulog-64d97.firebasestorage.app",
  messagingSenderId: "750043829757",
  appId: "1:750043829757:web:a8044cf320dbd836ff3594"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);