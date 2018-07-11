
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDIdaclc2AkqpFKSgt5hMIOpKSAnFAWsXs",
    authDomain: "forme-1abe6.firebaseapp.com",
    databaseURL: "https://forme-1abe6.firebaseio.com",
    projectId: "forme-1abe6",
    storageBucket: "forme-1abe6.appspot.com",
    messagingSenderId: "399636586027"
};
firebase.initializeApp(config);


var today = {};
var todaysDate = moment().format("YYYY-MM-DD");
var db = firebase.firestore();
