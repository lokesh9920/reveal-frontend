let backendURL = 'https://reveal-backend.herokuapp.com'
let authURL = 'https://reveal-auth.herokuapp.com/identity-management/v1'

let loggingIn = document.getElementById("login")
let registerPage = document.getElementById("register")
let forgotPage = document.getElementById("forgot")
let toggleEntry = document.querySelectorAll('button.togglePage');
let groupDropDown = document.getElementById("groupMenu");
let nullOption = document.getElementById('nullGroup');
let registrationFailedMessage = document.getElementById('f-reg-msg');
let loginFailedMessage = document.getElementById('f-lgn-msg');
let resetPassMessage = document.getElementById('rst-msg');

let registerButton = document.querySelector('button.onboardme');
let registrationForm = document.getElementById('registrationdiv').getElementsByTagName('input');
let accessToken = "";

let loginButton = document.querySelector('button.logmein');
let loginForm = document.getElementById('logindiv').getElementsByTagName('input');

let resetPassButton = document.querySelector('button.request_reset');
let resetForm = document.getElementById('fgt-psd').getElementsByTagName('input');

loggingIn.style.display = "none";
forgotPage.style.display="none";

registerButton.addEventListener('click', function(){
    let registrationFormElements = registrationForm;
    //group name concept is removed and hence only default value is used now.
    let requestBody = JSON.stringify({'firstName': registrationFormElements['firstName'].value,'lastName': registrationFormElements['lastName'].value, 'mailId': registrationFormElements['mailId'].value, 'userName': registrationFormElements['userName'].value, 'password': registrationFormElements['password'].value, 'groupName': 'DEFAULT'});
    let requestPost = fetch(authURL+'/users/register',{
    	method: 'POST',
    	headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include',  // for this to work, in server allowed-origins headers should not be *, it should be the origin domain
    	body: requestBody
    }).then(response => response.json().then(json =>{
    	if(response.status===201){
            registrationFailedMessage.style.display='none';
            console.log("Registered Successfully");
            accessToken = response.headers.get("Auth-Token");
            setCookie(accessToken);
            window.location= '../';
            
        }
        else if(response.status===409){
            console.log("The error is : " + json.errorMessage);
            registrationFailedMessage.textContent = json.errorMessage;
            registrationFailedMessage.style.display='block';
            
        }
    })
    
).catch((err)=> {
    registrationFailedMessage.textContent = 'An Unexpected error occured';
    registrationFailedMessage.style.display='block';
})
});

loginButton.addEventListener('click', function(){
    console.log('trying to login');
    let loginFormElements = loginForm;
    let requestBody = JSON.stringify({'userName': loginFormElements['userName'].value,'password': loginFormElements['password'].value});
    console.log(requestBody);
    let requestPost = fetch(authURL+'/users/login',{
    	method: 'POST',
    	headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include',  // for this to work, in server allowed-origins headers should not be *, it should be the origin domain
    	body: requestBody
    }).then(function(response){
        if(response.status===200){
            loginFailedMessage.style.display='none';
            console.log("loggedin Successfully");
            accessToken = response.headers.get("Auth-Token");
            setCookie(accessToken);
            window.location= '../';
            
        }
        else if(response.status===401){
            loginFailedMessage.textContent = 'Invalid Credentials';
            loginFailedMessage.style.display='block';
            
        }
    }).catch((err)=>{
        loginFailedMessage.textContent = 'An Unexpected error occured';
        loginFailedMessage.style.display='block';
    })
});

resetForm['userName'].addEventListener('input',()=>{
    resetPassMessage.style.display='none';
});
resetPassButton.addEventListener('click', function(){
    console.log('requested password reset link');
    let resetFormElements = resetForm;
    let requestBody = JSON.stringify({'userName': resetFormElements['userName'].value});
    console.log(requestBody);
    let requestPost = fetch(authURL+'/users/account-management',{
    	method: 'PUT',
    	headers: {
            'Content-Type': 'application/json'
        },
        //credentials: 'include',  // for this to work, in server allowed-origins headers should not be *, it should be the origin domain
    	body: requestBody
    }).then(function(response){
        if(response.status===202){
            resetPassMessage.textContent = 'Password reset link will be sent to regestered e-mail'
            resetPassMessage.style.display='block';
            resetPassMessage.style.color='green';
        }
        else{
            resetPassMessage.textContent = 'request failed, Please consider reporting the issue'
            resetPassMessage.style.display='block';
            resetPassMessage.style.color='red';
        }
    }).catch((err)=>{
        resetPassMessage.textContent = 'Request failed';
            resetPassMessage.style.display='block';
            resetPassMessage.style.color='red';
    })
});




for(btn=0;btn<toggleEntry.length;btn++){
    toggleEntry[btn].addEventListener('click',function(){

        resetPassMessage.style.display='none';
        loginFailedMessage.style.display='none';
        registrationFailedMessage.style.display='none';

        if(loggingIn.style.display==='none'){
            loggingIn.style.display='block';
            registerPage.style.display='none';
            forgotPage.style.display="none";
            
        }
        else{
            loggingIn.style.display='none';
            registerPage.style.display='block';
            forgotPage.style.display="none";


        }
    });
}

document.querySelector('a.forgot').addEventListener('click',function(){
    loggingIn.style.display='none';
    registerPage.style.display='none';
    forgotPage.style.display="block";

});

// removing group fetching logic
// let restCallForGroupsList = fetch(authURL+"/groups").then(function(response){
        
//         return response.json();
//     }).then(function(json){
//         console.log(json.groups.length);

//         json.groups.forEach(element => {
//             let optionElement = document.createElement('option');
//             optionElement.textContent = element.groupName;
//             groupDropDown.appendChild(optionElement);
//            // groupDropDown.insertBefore(optionElement,nullOption.nextSibling);
        
//         });

//     });

function setCookie(accessToken){
    document.cookie = 'access-token='+accessToken;

}