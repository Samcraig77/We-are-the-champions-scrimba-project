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
const likesBtn = document.getElementsByClassName("like")



onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
            
        for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
                let messageEl = currentItem[1][0]
                let fromEl = currentItem[1][1]
                let toEl = currentItem[1][2]
                
                renderEndorsements(messageEl, toEl, fromEl)
                
            }    
        } else {
            endorsementsArea.innerHTML = "No endorsements here... yet"
        }
        
    })

    function renderLikes(item) {

    }

    function renderEndorsements(message, to, from) {
        endorsementsArea.innerHTML += `<div class="message"> 
        <div class="to-user">To ${to}</div> 
        <hr>
         ${message} 
        <hr>
       <span class="bottom-of-message"><p> <span class="from-user">From ${from} </span> <span class="like"><3</span><span="like-count"> 0 </span></p>

        </div>`
    
    }

publishBtn.addEventListener("click", function() {
    if(messageField.value != false) {    
        let message = messageField.value
        let from = messageFrom.value
        let to = messageTo.value 
        push(endorsementsInDB, [message, from, to])
        }
})

