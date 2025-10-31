// Firebase v10 (Compat) — untuk KARTEJI PRO MAX
// Import via <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
// Tidak perlu import di sini, cukup definisi config & ekspor objek.

const firebaseConfig = {
  apiKey: "AIzaSyAjNVTi5ZjZDLRcfxXmf2gWmHswSHM4d8E",
  authDomain: "karteji.firebaseapp.com",
  projectId: "karteji",
  storageBucket: "karteji.appspot.com",
  messagingSenderId: "828706251907",
  appId: "1:828706251907:web:54825185b074209c4fe7b6",
  measurementId: "G-PPGRMBXGHW"
};

// Inisialisasi Firebase (kompatibel)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
