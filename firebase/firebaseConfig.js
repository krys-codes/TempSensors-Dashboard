const { initializeApp, cert } = require("firebase-admin/app");

initializeApp({
  credential: cert("./firebase/admin.json"),
  apiKey: "AIza_____YOUR-API-KEY",
  authDomain: "your-auth-domain.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
});

module.exports = { initializeApp };
