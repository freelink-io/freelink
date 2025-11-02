// js/firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js';
import { getFirestore, collection, query, getDocs, addDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.24.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyAe9YvW-A_lbm2_sq4IcoSr99E8njcIiX0",
  authDomain: "freelink-com.firebaseapp.com",
  projectId: "freelink-com",
  storageBucket: "freelink-com.firebasestorage.app",
  messagingSenderId: "922204517729",
  appId: "1:922204517729:web:4f93f33221bb7e93fb4120"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * seedDefaults()
 * Creates categories and a small meta doc if they don't exist.
 * This runs on first page load (optional) and won't duplicate.
 */
export async function seedDefaults(){
  try {
    const categories = ["Web Development","Graphic Design","Content Writing","Digital Marketing","Mobile Apps"];
    const col = collection(db, 'categories');
    const q = query(col);
    const snap = await getDocs(q);
    if (snap.empty) {
      for (const c of categories) await addDoc(col, { name: c, createdAt: Date.now() });
    }
    // meta/admin
    const adminRef = doc(db, 'meta', 'admin');
    await setDoc(adminRef, { createdAt: Date.now() }, { merge: true });
  } catch (e) {
    console.error('seedDefaults error', e);
  }
      }
