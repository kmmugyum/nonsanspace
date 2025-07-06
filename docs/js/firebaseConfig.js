// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_x42u5N0cgcL4UZg72eWHho5oi3Nx1Tw",
  authDomain: "healing-space-22fcc.firebaseapp.com",
  databaseURL: "https://healing-space-22fcc-default-rtdb.firebaseio.com",
  projectId: "healing-space-22fcc",
  storageBucket: "healing-space-22fcc.firebasestorage.app",
  messagingSenderId: "748135616885",
  appId: "1:748135616885:web:b35bc65e64b618ad3b033c",
  measurementId: "G-P9KXE942CF"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getDatabase(app);

export { db };
