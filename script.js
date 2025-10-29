// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, onValue, get, child } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: ""
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Add a directory link randomly chosen
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
// Run only when there's random directory button
if(document.getElementById('randomDirectory')) {
    // Show users on screen
    window.onload = showRandomDirectory;
}

// List all directory info
if(document.getElementById('webpageList')) {
    const webpageList = document.getElementById('webpageList');

    const reference = ref(database, '/sites');
    onValue(reference, (snapshot) => {
        webpageList.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const webpage = childSnapshot.val();
            const li = document.createElement('li');
            li.innerHTML = `<div class="directory-list">
            <h3>${webpage.name}</h3>
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