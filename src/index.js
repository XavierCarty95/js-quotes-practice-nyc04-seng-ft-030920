let quoteList = document.getElementById("quote-list")
let form = document.getElementById("new-quote-form")


form.addEventListener("submit", function(evt){

    let authorName = evt.target["author"].value
    let quoteName = evt.target["new-quote"].value

    evt.preventDefault()

   fetch("http://localhost:3000/quotes", {
     
     method: "POST",
     headers: {
         "Content-type" : "application/json"
     },

     body: JSON.stringify({
         quote: quoteName,
         author: authorName
     })


   }).then(r => r.json())
   .then(postObj => {
    console.log(postObj)
       postObj.likes = []
       render(postObj)
   })



})

fetch("http://localhost:3000/quotes?_embed=likes")
.then(r => r.json())
.then(quoteResponse => {
   quoteResponse.forEach(element => {
       render(element)
   })




})


function render(quote){


    let li = document.createElement("li")

    li.classList.add("quote-card")

    li.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  `
   
    quoteList.append(li)

    let deleteButton = li.querySelector('.btn-danger')

    deleteButton.addEventListener('click' , function(evt){
       
    fetch(`http://localhost:3000/quotes/${quote.id}`, {

           method: "DELETE"
    }).then(r => r.json())
    .then(deletedObj => {
        console.log(deletedObj)
        li.remove()

    })


        



    })


    let likeButton = li.querySelector(".btn-success")
    let likeSpan = li.querySelector("span")

    likeButton.addEventListener('click' , function(event){
       
        fetch('http://localhost:3000/likes', {

        method: "POST", 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            quoteId : quote.id 
        })



        }).then(r => r.json())
        .then(newLikes => {
            quote.likes.push(newLikes)
             likeSpan.innerText = quote.likes.length

        })




    })




}