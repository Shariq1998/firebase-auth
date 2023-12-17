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


const userData = JSON.parse(localStorage.getItem('user'));
  

  const userName = JSON.parse(localStorage.getItem('user-name'))

  document.addEventListener('DOMContentLoaded', function () {

  

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
    const userId = user.uid;

    // Load tasks from Firebase for the logged-in user
   
    // document.getElementById('profilePic').style.display='none'
    window.location.href = 'dashboard.html'
    swal("", "Successfully logged in!", "success");
    loadTasksFromFirebase(userId);
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    swal("", "Username or email does not match!", "error");
  });


    allInputs.forEach(singleInput => singleInput.value = '');

})
  })


function loadTasksFromFirebase(userId) {
    const tasksRef = doc(db, 'tasks', userId);
  
    // Load tasks from Firebase for the user
    getDocs(tasksRef)
      .then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          userTodo = documentSnapshot.data().tasks || [];
          console.log('Tasks loaded from Firebase:', userTodo);
          displayTasks();
        } else {
          console.log('No tasks found for the user');
        }
      })
      .catch((error) => {
        console.error('Error loading tasks from Firebase: ', error);
      });
  }

  function displayTasks() {
    // Clear the current task list in the UI
    ul.innerHTML = '';
  
    // Loop through userTodo array to display tasks
    userTodo.forEach(function (taskText) {
      // Create new elements for each task
      const myDiv = document.createElement('div');
      myDiv.className = 'myDiv';
  
      const myLi = document.createElement('li');
      myLi.className = 'list';
      myLi.textContent = taskText;
  
      const cancel = document.createElement('button');
      cancel.className = 'myCancel';
      cancel.innerHTML = 'X';
  
      // Add the task elements to the DOM
      myDiv.appendChild(myLi);
      myDiv.appendChild(cancel);
      ul.appendChild(myDiv);
      console.log('Displaying tasks:', userTodo);
  
      // Add a click event listener to remove the task
      cancel.addEventListener('click', function () {
        // Find the index of the task to remove
        var index = userTodo.indexOf(taskText);
  
        // Remove the task from the user's to-do list
        if (index !== -1) {
          userTodo.splice(index, 1);
  
          // Remove the task element from the DOM
          ul.removeChild(myDiv);
        }
      });
    });
    console.log('Tasks displayed on the UI:', userTodo);
  }







   
















  
