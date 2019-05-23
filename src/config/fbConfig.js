import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDLui_bTLEJjq0MrQIURUyatd6loWNqiOQ",
    authDomain: "react-o-notes.firebaseapp.com",
    databaseURL: "https://react-o-notes.firebaseio.com",
    projectId: "react-o-notes",
    storageBucket: "react-o-notes.appspot.com",
    messagingSenderId: "11874089858",
    appId: "1:11874089858:web:25407c560948bba4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;