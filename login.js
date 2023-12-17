import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDocs,  setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

        // Replace with your Firebase project configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBidQg9DV7N6X2DPtxBV8mC5GTeRlQrmio",
            authDomain: "smit-project-f323f.firebaseapp.com",
            projectId: "smit-project-f323f",
            storageBucket: "smit-project-f323f.appspot.com",
            messagingSenderId: "1095974526287",
            appId: "1:1095974526287:web:6b1bba11e476bd47ccf93a"
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







   
















  
