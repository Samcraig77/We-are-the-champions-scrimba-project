import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champs-74996-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsmentsInDB = ref(database, "endorsments")

const messageField = document.getElementById("message-field")
const messageFrom = document.getElementById("from-input")
const messageTo = document.getElementById("to-input")
const publishBtn = document.getElementById("publish-btn")
const endorsmentsArea = document.getElementById("endorsments-area")



onValue(endorsmentsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
            
        for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
                let messageEl = currentItem[1][0]
                let fromEl = currentItem[1][1]
                let toEl = currentItem[1][2]
                
                renderEndorsments(messageEl, toEl, fromEl)
                
            }    
        } else {
            endormentsArea.innerHTML = "No endorsments here... yet"
        }
        
    })

    function renderEndorsments(message, to, from) {
        endorsmentsArea.innerHTML += `<p id="message"> 
        Hey, ${to}! 
        ${message} 
        <span>${from}</span>
        </p>`
    
    }

publishBtn.addEventListener("click", function() {
    let message = messageField.value
    let from = messageFrom.value
    let to = messageTo.value 
    push(endorsmentsInDB, [message, from, to])

})

