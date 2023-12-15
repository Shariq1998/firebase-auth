import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc,getDoc,  setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

        // Replace with your Firebase project configuration
        const firebaseConfig = {
    apiKey: "AIzaSyBX-KjBwPIT2IaQjK6FO5B9KWFC4DNnXHg",
    authDomain: "hello-5f7cb.firebaseapp.com",
    projectId: "hello-5f7cb",
    storageBucket: "hello-5f7cb.appspot.com",
    messagingSenderId: "942513886582",
    appId: "1:942513886582:web:5fa79ffa6561391d171657"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var allInputs = document.querySelectorAll('input');






document.getElementById('button-logIn').addEventListener('click',function(e){

e.preventDefault();
  var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
   
    
         
    
    if(email == ''  || password == '' ){
         swal("", "Please fill the empty fields!", "error");
         return false
    }

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = 'dashboard.html'
    swal("", "Successfully logged in!", "success");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    swal("", "Username or email does not match!", "error");
  });


    allInputs.forEach(singleInput => singleInput.value = '');

})







   
















  