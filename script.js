/* 
    How to use firebase:
    1. Connect to firebase. (api keys) X
    2. CRUD
        - Create X
        - Read 
        - Update
        - Delete
    3. Display data.
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, onValue, push, set, get, child } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDClQ0KhhVzRmneZw45j0F35n-7L354BrA",
  authDomain: "brickmmo-f41ae.firebaseapp.com",
  databaseURL: "https://brickmmo-f41ae-default-rtdb.firebaseio.com",
  projectId: "brickmmo-f41ae",
  storageBucket: "brickmmo-f41ae.firebasestorage.app",
  messagingSenderId: "511312519816",
  appId: "1:511312519816:web:b11956d0248e0b5f04f53d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Selects the form element and the result element
const form = document.getElementById('form');
const results = document.getElementById('results');

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Created directory object and add it to firebase
function addData(name, url, author, github) {
    const directory = {
        name: name.value,
        url: url.value,
        author: author.value,
        github_link: github.value
    }
    // Get site directory
    const postListRef = ref(database, 'sites');
    // Get id key of new directory
    const newPostRef = push(postListRef);
    // Update database with new directory
    set(newPostRef, directory);
};

// Create Element
function createElement(db) {
    const element = document.createElement('p');
    element.innerText = `name: ${db.name} url: ${db.url} github: ${db.github_link}`
    results.append(element)
}

// retrieves data from firebase
function showData() {
    const reference = ref(database, '/sites');
    onValue(reference, function(snapshot) {
        snapshot.forEach(childSnapshot => {
            createElement(childSnapshot.val())
        })
    })
}


const showRandomDirectory = () => {
    const reference = ref(database, '/sites');
    onValue(reference, function(snapshot) {
        // Select link tag for random directory
        const linkId = document.getElementById('randomDirectory');
        // Select snapshot object keys
        const directoryList = Object.keys(snapshot.val());
        // Select random directory
        const randomDirectory = Math.floor(Math.random() * directoryList.length);

        get(child(reference, `${directoryList[randomDirectory]}`)).then((snapshot) => {
        linkId.href = snapshot.val().url;
        })
        .catch((error) => {
        console.error(error);
        });
       
    })
}

if(document.getElementById('randomDirectory')) {
    // Show users on screen
    window.onload = showRandomDirectory;
}

if(document.getElementById('form')) {
    // Store form data into firebase database
    form.onsubmit = function() {
        
        const siteName = document.getElementById('siteName');
        const siteUrl = document.getElementById('siteUrl');
        const siteAuthor = document.getElementById('siteAuthor');
        const githubUrl = document.getElementById('githubUrl');
        
        addData(siteName, siteUrl, siteAuthor, githubUrl);

        return false;
    }
}

if(document.getElementById('webpageList')) {
    const webpageList = document.getElementById('webpageList');

    const reference = ref(database, '/sites');
    onValue(reference, (snapshot) => {
        webpageList.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const webpage = childSnapshot.val();
            const li = document.createElement('ul');
            li.innerHTML = `<div class="directory-list">
            <h3>${webpage.name}</h3>
            <img src="data:image/png;base64,${webpage.image}">
            <p>${webpage.author}</p>
            <p>
                <a href="${webpage.url}">Visit Website</a>
                <a href="${webpage.github_link}">GitHub repo</a>
            </p>
            </div>`;
            webpageList.appendChild(li);
        });
    });
}