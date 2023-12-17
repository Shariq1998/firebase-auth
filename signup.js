import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc,getDoc,  setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth,onAuthStateChanged , createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();




var allInputs = document.querySelectorAll('input');




document.getElementById('button1').addEventListener('click',function(e){

  e.preventDefault();

    
    
  var username = document.getElementById('username2').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password2').value;

      
  
  
  // form validation
  if (username === '' || email === '' || password === '' ){
      swal("", "Please fill the empty fields!", "error");
      
  return false

  }

  
  var status = validateForm(username, email, password)
  




  if (status) {
    const auth = getAuth(app);

    localStorage.setItem('user-name', JSON.stringify({
      name: username,
    }));

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        localStorage.setItem('user-id', userId);
        console.log('User signed up:', user);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('User is signed in:', user);
            // Redirect or perform actions after signup
            window.location.href = 'dashboard.html';
          } else {
            console.log('No user is signed in.');
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error during signup:', errorMessage);
      });
  }



})


  







function validateForm(username, email, password) {
  const showError = (message) => {
    swal("", message, "error");
    allInputs.forEach(singleInput => singleInput.value = '');
  };

  if (username.length < 3 || username.length > 20) {
    showError("Username must be between 4 and 20 characters long!");
    return false;
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters long!");
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(emailPattern)) {
    showError("Invalid email format!");
    return false;
  }

  // Uncomment the block below if needed
  // var status2 = checkExisting();
  // if (status2) {
  //   showError("Username or email already exists. Please choose a different one.");
  //   allInputs.forEach(singleInput => singleInput.value = '');
  //   return false;
  // }

  allInputs.forEach(singleInput => singleInput.value = '');
  return true;
}





// function checkExisting(){
//   var username = document.getElementById('username2').value;
//   var email = document.getElementById('email').value;

//   var users2
//   if(localStorage.getItem("authUsers")){
//        users2 = JSON.parse(localStorage.getItem("authUsers"))
//   }
//   else{
//       users2 = []
//   }
//   const userExists = users2.some(user => user.username === username);
//             const emailExists = users2.some(user => user.email === email);
           
//             if (userExists || emailExists) {
                
//                 return true

//             } 
//             else{
//               return false
//             }
           
// }


document.getElementById('button2').addEventListener('click',function(e){
  e.preventDefault()
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

  
    // The signed-in user info.
    const user = result.user;
    
    
    swal("", "Successfully signed up!", "success").then(() => {
      window.location.replace('dashboard.html');
    });
    localStorage.setItem('user', JSON.stringify({
      displayName: user.displayName,
      photoURL: user.photoURL,
    }));
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email || (error.customData ? error.customData.email : null);
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    if (email) {
      // Handle the case where email is available
      console.log('Email:', email);
    } else {
      // Handle the case where email is not available
      console.log('Email not available.');
    }
    swal("", "error!", "warning");
    // ...
  });
})







   















  
