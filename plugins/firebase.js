import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyChQJ4KzTEILFsar2ucC3hck08dShps-rk",
    authDomain: "note-proto.firebaseapp.com",
    databaseURL: "https://note-proto.firebaseio.com",
    projectId: "note-proto",
    storageBucket: "note-proto.appspot.com",
    messagingSenderId: "141761040038",
    appId: "1:141761040038:web:f302fc549c4838143e6e67"
  })
}

export default firebase
