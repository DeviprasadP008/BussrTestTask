import Firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyDcz65gQxQVr-aqlAs_8pz-cwclPoOMbck',
  authDomain: 'bussrtesttask.firebaseapp.com',
  databaseURL: 'https://bussrtesttask-default-rtdb.firebaseio.com',
  projectId: 'bussrtesttask',
  storageBucket: 'bussrtesttask.appspot.com',
  messagingSenderId: '202639749951'
};
let app = Firebase.initializeApp(config);
export const db = app.database();
