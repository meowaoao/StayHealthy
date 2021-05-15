//firebaseConfig
var firebaseConfig = {
  apiKey: "AIzaSyDrQf_sAEXQl4XXXK7OtLhBGOA70ibshFA",
  authDomain: "march05-111a8.firebaseapp.com",
  databaseURL: "https://march05-111a8.firebaseio.com",
  projectId: "march05-111a8",
  storageBucket: "march05-111a8.appspot.com",
  messagingSenderId: "762965896260",
  appId: "1:762965896260:web:c8028c6367a8e84adae011"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();