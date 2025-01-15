// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAgy7dQFuBnPDCWOULwCWUvTWlbkW8lHRY",
    authDomain: "petapp-d9455.firebaseapp.com",
    projectId: "petapp-d9455",
    storageBucket: "petapp-d9455.firebasestorage.app",
    messagingSenderId: "511097061085",
    appId: "1:511097061085:web:c256e02efd08dd560e2534"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };