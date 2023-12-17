import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {  getFirestore, collection, addDoc, getDoc, setDoc, deleteDoc, doc, updateDoc  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

        // Replace with your Firebase project configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBidQg9DV7N6X2DPtxBV8mC5GTeRlQrmio",
            authDomain: "smit-project-f323f.firebaseapp.com",
            projectId: "smit-project-f323f",
            storageBucket: "smit-project-f323f.appspot.com",
            messagingSenderId: "1095974526287",
            appId: "1:1095974526287:web:6b1bba11e476bd47ccf93a"
          };


          const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve user information from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    
  
    const userName = JSON.parse(localStorage.getItem('user-name'))
  
    // Check if user data is available
    if (userData) {
      // Display user information on the dashboard
      document.getElementById('displayName').innerText = userData.displayName;
      document.getElementById('profilePic').src = userData.photoURL;
    }
    //   else {
    //   // Handle the case when user data is not available
    //   console.error('User data not found.');
    // }
  
    else if(userName){
     document.getElementById('profilePic').style.display='none'
      document.getElementById('displayName').innerText = userName.name
    }
    else{
      document.getElementById('profilePic').style.display='none'
    }
  });

const myButton = document.getElementById('myButton');
const myInput = document.getElementById('myInput');
const ul = document.getElementById('myUl');

let userTodo = [];
let userId;

// Function to initialize the user
function initUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId = user.uid;
      loadTasksFromFirebase(userId);
    } else {
      // User is not logged in
      userId = null;
      userTodo = [];
      displayTasks(); // Display an empty list if not logged in
    }
  });
}

initUser();

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

    // Add a click event listener to remove the task
    cancel.addEventListener('click', function () {
      // Find the index of the task to remove
      const index = userTodo.indexOf(taskText);

      // Remove the task from the user's to-do list
      if (index !== -1) {
        userTodo.splice(index, 1);

        // Remove the task element from the DOM
        ul.removeChild(myDiv);

        // Update tasks in Firebase after removal
        updateTasksInFirebase(userId);
      }
    });
  });
}

// Call this function initially to display the user's tasks
displayTasks();

function addButton() {
    console.log('Add button clicked');
  const myInputValue = myInput.value.trim(); // Get the input value and remove leading/trailing spaces

  if (myInputValue === '') {
    // Exit early if the input is empty
    return;
  }

  // Add the task to the user's to-do list
  userTodo.push(myInputValue);

  // Clear the input field
  myInput.value = '';

  // Call the displayTasks function to update the UI
  displayTasks();

  // Update tasks in Firebase after addition
  updateTasksInFirebase(userId);
}
console.log('Setting up event listener for add button');
// Add the event listener without invoking the function
 myButton.addEventListener('click', addButton);

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearList);

function clearList() {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this list!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }

        // Clear the user's tasks array
        userTodo = [];

        // Update tasks in Firebase after clearing
        updateTasksInFirebase(userId);

        swal("Poof! Your list has been cleared!", {
          icon: "success",
        });
      }
    });
}

document.getElementById('log-out').addEventListener('click', function () {
    const auth = getAuth();
    const user = auth.currentUser;
  
    // Check if the user is logged in
    if (user) {
      const userId = user.uid;
  
      // Update tasks in Firebase before signing out
      updateTasksInFirebase(userId).then(() => {
        // Sign out the user
        signOut(auth).then(() => {
          // Clear local storage and redirect
          window.location.href = 'login.html';
          localStorage.removeItem('user');
          localStorage.removeItem('user-name');
        }).catch((error) => {
          // Handle sign-out errors
          console.error('Sign-out error:', error.message);
          swal("Error", error.message, "error");
        });
      });
    }
  });

  function updateTasksInFirebase(userId) {
    const tasksRef = doc(db, 'tasks', userId);
  
    // Update the tasks in Firebase
    return setDoc(tasksRef, { tasks: userTodo })
      .then(() => {
        console.log('Tasks updated in Firebase for user: ', userId);
      })
      .catch((error) => {
        console.error('Error updating tasks in Firebase: ', error);
        throw error; // Re-throw the error to propagate it to the calling code
      });
  }

  function loadTasksFromFirebase(userId) {
    const tasksRef = doc(db, 'tasks', userId);
getDoc(tasksRef)
  .then((documentSnapshot) => {
    if (documentSnapshot.exists()) {
      userTodo = documentSnapshot.data().tasks || [];
    } else {
      userTodo = [];
    }

    // Call displayTasks after updating the userTodo array
    displayTasks();
  })
  .catch((error) => {
    console.error('Error loading tasks from Firebase: ', error);
  });
  }

