import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

//Get endorsements from database
onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
       
        endorsementsArea.innerHTML = ""
        
        for (let i = 0; i < itemsArray.length; i++) {
                let currentPost = itemsArray[i][1]
                let id = itemsArray[i][0]
                let messageEl = currentPost["message"]
                let fromEl = currentPost["from"]
                let toEl = currentPost["to"]
                let likeCount = currentPost["likeCount"]
                renderEndorsements(messageEl, toEl, fromEl, likeCount, id, currentPost)
            }    
        } else {
            endorsementsArea.innerText = "No endorsements here... yet"
        }
})

//Plugs in the input information that was stored when the form was submitted and displays it
function renderEndorsements(message, to, from, likeCount, id) {

        endorsementsArea.innerHTML += `
        <div class="message">
            <p> Hey, 
                <span class="to-user">${to}</span>
            </p> 
            <p>${message}</p> 
            <div class="bottom-msg">
            <p>From: <span class="from-user">${from}</span></p>
            <button class="like-count like-btn" data-id=${id} data-likes=${likeCount}>${likeCount} ❤️</button>
            </div>
        </div>
        `
}

endorsementsArea.addEventListener("click", function(event){
    console.log(event.target)
    if (event.target.dataset) {
        handleLikes(event.target.dataset.id, event.target.dataset.likes)
    }
})


function handleLikes(id, likeCount) {
        // Specify the path to the endorsement
        const endorsementRef = ref(database, `endorsements/${id}`)

        // New likes value
        let newLikeCount = Number(likeCount) + 1 // we use Number() to turn a string (the dataset is a string type) into a number

        // Update the likes value
        update(endorsementRef, {
            likeCount: newLikeCount
        })
}

//Takes the form values and stores them
publishBtn.addEventListener("click", function(event) {
    event.preventDefault()
    if (messageField.value && messageFrom.value && messageTo.value != null) {
        const postData = {
        message: messageField.value,
        from: messageFrom.value,
        to: messageTo.value,
        likeCount: 0 
        }
    push(endorsementsInDB, postData)
    messageField.value = ""
    messageFrom.value = ""
    messageTo.value = ""
    } else {
        console.error("Please fill out the entire form");
    }
})