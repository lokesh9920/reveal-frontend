let backendLocation = 'https://reveal-backend.herokuapp.com'

let postsSection = document.getElementById('posts');
let bodyEnding = document.getElementById('end');

let postBox = document.querySelector('textarea.postwriter');
let postMyGossip = document.querySelector('button.postwriter');


postMyGossip.addEventListener('click',()=>{
    let requestBody = postBox.value;
    console.log(requestBody);

    fetch(backendLocation+'/posts',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({'postCreator': 'testUser','group': 1, 'postContent': requestBody})
    }).then((response)=>{
        if(response.status===201){
            console.log('posted successfully');
        }
    })
})

//fetching posts from backend 

let restCall = fetch('https://reveal-backend.herokuapp.com/posts?groupId=1').then(function(response){
    console.log(response.status);
   // console.log(response.json());
    return response.json();
}).then(function(json){
    
    json.posts.forEach(element => {
    
        //creating different elements
     let individualPostSection = document.createElement('div');
     individualPostSection.setAttribute('class','individualPost');
     let postContent = document.createElement('div');
     postContent.setAttribute('class','post-content body-mid');
     let opinionElement = document.createElement('div');
     opinionElement.setAttribute('class','opinion');
     opinionElement.setAttribute('id','opinion');
     let bothCount = document.createElement('div');
     bothCount.setAttribute('class','count-like-dislike');

     let spanLikeCountParent = document.createElement('span');
     spanLikeCountParent.setAttribute('class','like');
     let likeSymbol = document.createElement('i');
     likeSymbol.setAttribute('style','font-size:16px');
     likeSymbol.setAttribute('class','far');
     likeSymbol.textContent = '✅'
     let spanLikeCount = document.createElement('span');
     spanLikeCount.setAttribute('class','like-count');

     let spandisLikeCountParent = document.createElement('span');
     spandisLikeCountParent.setAttribute('class','dislike');
     let dislikeSymbol = document.createElement('i');
     dislikeSymbol.setAttribute('style','font-size:16px');
     dislikeSymbol.setAttribute('class','fas');
     dislikeSymbol.textContent = '🚫';
     let spandisLikeCount = document.createElement('span');
     spandisLikeCount.setAttribute('class','dislike-count');

     let opinionButtons = document.createElement('div');
     opinionButtons.setAttribute('class','body-mid buttons');
     opinionButtons.setAttribute('id','buttons');
     let likeButton = document.createElement('button');
     likeButton.setAttribute('class','like opinion-button');
     likeButton.textContent = 'Heard it ✅';
     let dislikeButton = document.createElement('button');
     dislikeButton.setAttribute('class','dislike opinion-button');
     dislikeButton.textContent = 'fake 🚫';

     //setting content from the rest response body
    
     postContent.textContent = element.postContent;
     spanLikeCount.textContent = element.likesCount;
     spandisLikeCount.textContent = element.dislikesCount;
    
     // linking parents and childs
    
    spanLikeCountParent.appendChild(likeSymbol);
    spanLikeCountParent.appendChild(spanLikeCount);

    spandisLikeCountParent.appendChild(dislikeSymbol);
    spandisLikeCountParent.appendChild(spandisLikeCount);

     bothCount.appendChild(spanLikeCountParent);
     bothCount.appendChild(spandisLikeCountParent);

     opinionButtons.appendChild(likeButton);
     opinionButtons.appendChild(dislikeButton);

     opinionElement.appendChild(bothCount);

     opinionElement.appendChild(opinionButtons);
    
    individualPostSection.appendChild(postContent);
    individualPostSection.appendChild(opinionElement);
    
    // displaying;
    postsSection.insertBefore(individualPostSection,bodyEnding);

    });
});