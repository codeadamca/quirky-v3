// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, onValue, get, child } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCX7ktdSiy-XVTrwAydzPsCgkm_3w_dRhc",
    authDomain: "graphical-envoy-144714.firebaseapp.com",
    databaseURL: "https://codeadamca-quirky.firebaseio.com",
    projectId: "graphical-envoy-144714",
    storageBucket: "graphical-envoy-144714.firebasestorage.app",
    messagingSenderId: "809791716248",
    appId: "1:809791716248:web:455d11f25b9027bfc609ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

let random = document.getElementById('random');


// Run only when there's random directory button
if(random) 
{

    random.addEventListener("click", function() {
    
        showRandomDirectory();
        
    });

}

// Add a directory link randomly chosen
const showRandomDirectory = () => {

    const reference = ref(database, '/sites');

    onValue(reference, function(snapshot) {

        // Select link tag for random directory
        const linkId = document.getElementById('random');

        // Select snapshot object keys
        const directoryList = Object.keys(snapshot.val());

        // Select random directory
        const randomDirectory = Math.floor(Math.random() * directoryList.length);

        // Get a random site URL
        get(child(reference, directoryList[randomDirectory])).then((snapshot) => {

            if (snapshot.exists()) {

                const site = snapshot.val();
                linkId.href = site.url;

            } else {

                console.log("No data available");

            }

        }).catch((error) => {

            console.error(error);

        });
        
    })
}

// List all directory info
let pageList = document.getElementById('page-list');

if(pageList) {

    const reference = ref(database, '/sites');

    onValue(reference, (snapshot) => {
        pageList.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const webpage = childSnapshot.val();
            const col = document.createElement('div');
            col.className = "w3-quarter w3-container w3-margin-top";
            col.innerHTML = `
                <div class="w3-card w3-padding w3-center w3-margin-top">
                    <h3>${webpage.name}</h3>
                    <a href="${webpage.url}" target="_blank">
                        <img src="screenshots/${webpage.image}" style="width:100%;max-width:200px;">
                    </a>
                    <!--<p>${webpage.author}</p>-->
                    <p>
                        <a href="${webpage.url}" target="_blank">Visit Website</a><br>
                        <a href="${webpage.github_link}" target="_blank">GitHub repo</a>
                    </p>
                </div>`;
            pageList.appendChild(col);
        });
    });
}

// Run the function when the page loads
window.onload = () => {
  showRandomDirectory();
}