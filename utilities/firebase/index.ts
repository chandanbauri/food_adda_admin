import firebase from "firebase/app"

const Config = {
  apiKey: "AIzaSyBMmVYbIT0li0iIFAQyqesI0XgxBplY7K4",
  authDomain: "foodadda3-3aeca.firebaseapp.com",
  projectId: "foodadda3-3aeca",
  storageBucket: "foodadda3-3aeca.appspot.com",
  messagingSenderId: "348529372287",
  appId: "1:348529372287:web:eb2b70a4cac0160cfae34a",
  measurementId: "G-3X6SXH6GT7",
}

export const fireBaseClient = () => {
  if (!firebase.apps.length) firebase.initializeApp(Config)
}
