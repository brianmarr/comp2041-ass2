// importing named exports we use brackets
import { createPostTile, uploadImage, navHandler, registerHandler } from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';

const api  = new API('http://127.0.0.1:5000');

// we can use this single api request multiple times
//const feed = api.getFeed();
//const users = api.getUsers();

// Load posts
/*
feed.then(posts => {
    const reversePosts = posts.reverse();       // reverse to match chronological order
    reversePosts.reduce((parent, post) => {

        parent.appendChild(createPostTile(post));
        return parent;

    }, document.getElementById('large-feed'))
});
*/

// Nav bar event handler
document.querySelector(".nav").addEventListener("click", el => {
    navHandler(el.target.innerHTML);
});


document.querySelector("#login-button").addEventListener("click", el => {
    const loginForm = document.querySelector('#login-form');
    const postsBody = document.querySelector("#large-feed");
    const username = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;

    const feed = api.login(username, password)
        .then(data => window.localStorage.setItem('token', data.token));

    const feedArr = api.getFeed(window.localStorage.getItem('token'))
        .then(posts => {
            console.log(posts);     // gives array of post objects
            Array.from(posts).reduce((parent, post) => {

                parent.appendChild(createPostTile(post));
                return parent;
                
            }, document.getElementById('large-feed'));

            loginForm.classList.add("hide");
            loginForm.classList.remove("user-field");
            
            postsBody.classList.remove("hide");


            
        });
    
    

    



});

document.querySelector("#register-button").addEventListener("click", el => {
    registerHandler(data);
});


// Potential example to upload an image
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', uploadImage);




/*

login/reg:
on success, save access token to local storage, make get request to feed using access token, display feed
(reverse order between show feed and login - login first)


*/