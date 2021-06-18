let backendLocation = 'https://reveal-backend.herokuapp.com'
//let backendLocation = 'http://localhost:9999'
let logOutToken = '';
let postsSection = document.getElementById('posts');
let bodyEnding = document.getElementById('end');

let postBox = document.querySelector('textarea.postwriter');
let postMyGossip = document.querySelector('button.postwriter');
let logMeOut = document.querySelector('button.logmeout');


logMeOut.addEventListener('click',()=>{
    setCookie(logOutToken); //sets invalid value to the token, inorder to logot
});
postMyGossip.addEventListener('click',()=>{
    let requestBody = postBox.value;
    //checking for empty posts and invalidating those
    if(requestBody.trim().length !== 0){
	    fetch(backendLocation+'/posts',{
	        method: 'POST',
	       // credentials: 'include',
	        headers: {
	            'content-type': 'application/json',
	            "access-token": document.cookie
							  .split('; ')
							  .find(row => row.startsWith('access-token='))
							  .split('=')[1]
	        },
	        body: JSON.stringify({'postCreator': 'dummyUser','groupId': 1, 'postContent': requestBody})
	    }).then((response)=>{
	        if(response.status===201){
	            postBox.nodeValue = '';
	        }
	    })
    }});

//fetching posts from backend

let restCall = fetch('https://reveal-backend.herokuapp.com/posts?groupId=1',{
					 method: 'GET',
//					 credentials: 'include',
//					 mode: 'no-cors'
					 headers: {
						 "access-token": document.cookie
						  .split('; ')
						  .find(row => row.startsWith('access-token='))
						  .split('=')[1]
					 }
	}).then(function(response){
	    return response.json();
	}).then(function(json){
    
    json.posts.forEach(element => {
    //if(element.postContent.trim().length === 0) continue;
    	
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

    //  let spanLikeCountParent = document.createElement('span');
    //  spanLikeCountParent.setAttribute('class','like');
    //  let likeSymbol = document.createElement('i');
    //  likeSymbol.setAttribute('style','font-size:16px');
    //  likeSymbol.setAttribute('class','far');
    //  likeSymbol.textContent = '✅'
    //  let spanLikeCount = document.createElement('span');
    //  spanLikeCount.setAttribute('class','like-count');

    //  let spandisLikeCountParent = document.createElement('span');
    //  spandisLikeCountParent.setAttribute('class','dislike');
    //  let dislikeSymbol = document.createElement('i');
    //  dislikeSymbol.setAttribute('style','font-size:16px');
    //  dislikeSymbol.setAttribute('class','fas');
    //  dislikeSymbol.textContent = '🚫';
    //  let spandisLikeCount = document.createElement('span');
    //  spandisLikeCount.setAttribute('class','dislike-count');

    //  let opinionButtons = document.createElement('div');
    //  opinionButtons.setAttribute('class','body-mid buttons');
    //  opinionButtons.setAttribute('id','buttons');
    //  let likeButton = document.createElement('button');
    //  likeButton.setAttribute('class','like opinion-button');
    //  likeButton.textContent = 'Heard it ✅';
    //  let dislikeButton = document.createElement('button');
    //  dislikeButton.setAttribute('class','dislike opinion-button');
    //  dislikeButton.textContent = 'fake 🚫';

     //setting content from the rest response body
    
     postContent.textContent = element.postContent;
    //  spanLikeCount.textContent = element.likesCount;
    //  spandisLikeCount.textContent = element.dislikesCount;
    
     // linking parents and childs
    
    //spanLikeCountParent.appendChild(likeSymbol);
    //spanLikeCountParent.appendChild(spanLikeCount);

    // spandisLikeCountParent.appendChild(dislikeSymbol);
    // spandisLikeCountParent.appendChild(spandisLikeCount);

    //  bothCount.appendChild(spanLikeCountParent);
    //  bothCount.appendChild(spandisLikeCountParent);

    //  opinionButtons.appendChild(likeButton);
    //  opinionButtons.appendChild(dislikeButton);

    //  opinionElement.appendChild(bothCount);

    //  opinionElement.appendChild(opinionButtons);
    
    individualPostSection.appendChild(postContent);
    //individualPostSection.appendChild(opinionElement);
    
    // displaying;
    postsSection.insertBefore(individualPostSection,bodyEnding);

    });
});