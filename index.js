import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champs-74996-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const messageField = document.getElementById("message-field")
const messageFrom = document.getElementById("from-input")
const messageTo = document.getElementById("to-input")
const publishBtn = document.getElementById("publish-btn")
const endorsementsArea = document.getElementById("endorsements-area")
const likeBtn = document.getElementsByClassName("like-btn")
const likeCount = document.getElementsByClassName("like-count")


onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
            
        for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
                let messageEl = currentItem[1][0]
                let fromEl = currentItem[1][1]
                let toEl = currentItem[1][2]
                let likesEl = currentItem[1][3]
                
                renderEndorsments(messageEl, toEl, fromEl, likesEl)
                }    
        } else {
            endorsementsArea.innerHTML = "No endorsments here... yet"
        }
        
})

function renderEndorsments(message, to, from, likes) {
        endorsementsArea.innerHTML += `
        <div class="message"><p> 
            <p>
                Hey, 
                <span class="to-user">${to}
            </p> 
            <p>${message}</p> 
            <span>From: ${from} 
                <span class="likes-container">
                    <span class="like-count">${likes}</span>
                    <button class="like-btn">😸</button>
                </span>
            </span>
        
        </div>
        `
}

//likeBtn.addEventListener("click", function())


// function addLike(like) {
    
// }

publishBtn.addEventListener("click", function() {
   if (messageField.value != null) {
    let message = messageField.value
    let from = messageFrom.value
    let to = messageTo.value
    let likeCount = 0
    push(endorsementsInDB, [message, from, to, likeCount])
   }
})

