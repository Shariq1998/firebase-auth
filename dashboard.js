import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection , doc,getDocs, deleteDoc,  setDoc, query, where  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth, signOut , createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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
    console.error('error')
  }
});


document.getElementById('log-out').addEventListener('click',function(){
  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href = 'login.html';
    localStorage.removeItem('user');
    localStorage.removeItem('user-name')
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
                
            

})


const myButton = document.getElementById('myButton');
const myInput = document.getElementById('myInput');
var ul = document.getElementById('myUl');

// Assuming you have an array to store the user's tasks
var userTodo = [];

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
      var index = userTodo.indexOf(taskText);

      // Remove the task from the user's to-do list
      if (index !== -1) {
        userTodo.splice(index, 1);

        // Remove the task element from the DOM
        ul.removeChild(myDiv);
      }
    });
  });
}

// Call this function initially to display the user's tasks
displayTasks();

function addButton() {
  var myInputValue = myInput.value.trim(); // Get the input value and remove leading/trailing spaces

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
}

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
                var logInUser = JSON.parse(localStorage.getItem("loginUser"));

      if (logInUser && logInUser.id) {
        var userTodoKey = `userTodo_${logInUser.id}`;
        localStorage.removeItem(userTodoKey);
      }
      const userId = logInUser.id;
      clearTasksFromFirebase(userId);
                
            }

          swal("Poof! Your list has been cleared!", {
            icon: "success",
            
          });

    
        } 

      });

}

function clearTasksFromFirebase(userId) {
  const tasksRef = doc(db, 'tasks/' + userId);
  
  // Remove all tasks for the user in Firebase
  deleteDoc(tasksRef)
    .then(() => {
      console.log('Tasks cleared from Firebase for user: ', userId);
    })
    .catch((error) => {
      console.error('Error clearing tasks from Firebase: ', error);
    });
}

const userId = localStorage.getItem('user-id');

if (userId) {
  // User is logged in, load tasks based on the user ID
  loadTasksFromFirebase(userId);
} else {
  // Redirect or handle the case where the user is not logged in
}


function loadTasksFromFirebase(userId) {
  const tasksCollection = collection(db, 'tasks');
  const userTasksQuery = query(tasksCollection, where('userId', '==', userId));

  getDocs(userTasksQuery)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        userTodo = [];
        querySnapshot.forEach((doc) => {
          userTodo.push(doc.data().taskText);
        });
        displayTasks();
      } else {
        console.log('No tasks found for the user');
      }
    })
    .catch((error) => {
      console.error('Error loading tasks: ', error);
    });
}
