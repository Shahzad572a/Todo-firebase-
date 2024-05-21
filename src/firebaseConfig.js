 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
 

export default firebaseConfig;


// const firebaseConfig = {
//   apiKey: "AIzaSyDQGxL0LgAm2C5Dt7FP-aBA-ItsPnwcZnM",
//   authDomain: "todo-de49a.firebaseapp.com",
//   projectId: "todo-de49a",
//   storageBucket: "todo-de49a.appspot.com",
//   messagingSenderId: "168111921029",
//   appId: "1:168111921029:web:d39c62ab342fa84a5056ec"
// };
// export default firebaseConfig;
// const app = initializeApp(firebaseConfig);
// const store = getFirestore(app);
// export default store;
