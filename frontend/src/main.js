// importing named exports we use brackets
import { createPostTile, uploadImage, navHandler } from './helpers.js';

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


// Login
document.querySelector("#login-button").addEventListener("click", el => {
    const loginForm = document.querySelector('#login-form');
    const postsBody = document.querySelector("#large-feed");
    const username = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;

    // get token and store in localStorage
    const feed = api.login(username, password)
        .then(data => window.localStorage.setItem('token', data.token));
        

    
    // retrieve token from localStorage
    const feedArr = api.getFeed(window.localStorage.getItem('token'))
        .then(data => {
            //console.log(data.posts); //returns array of posts

            // create feed
            if (data.posts !== undefined) {
                data.posts.reduce((parent, post) => {

                    parent.appendChild(createPostTile(post));
                    return parent;
                    
                }, document.getElementById('large-feed'));
            }

            // hide login form
            loginForm.classList.add("hide");
            loginForm.classList.remove("user-field");

            // show feed
            postsBody.classList.remove("hide");
            
        });
});



// Register (does push to /auth/signup then follows same procedure as login)
document.querySelector("#register-button").addEventListener("click", el => {
    const regForm = document.querySelector('#register-form');
    const postsBody = document.querySelector("#large-feed");

    const username = document.querySelector('#register-username').value;
    const password = document.querySelector('#register-password').value;
    const email = document.querySelector('#register-email').value;
    const name = document.querySelector('#register-name').value;

    // get token and store in localStorage
    const feed = api.signup(username, password, email, name)
        .then(data => window.localStorage.setItem('token', data.token));

    // retrieve token from localStorage
    const feedArr = api.getFeed(window.localStorage.getItem('token'))
        .then(data => {
            //console.log(data.posts); returns array of posts

            // create feed
            if (data.posts !== undefined) {
                data.posts.reduce((parent, post) => {

                    parent.appendChild(createPostTile(post));
                    return parent;
                    
                }, document.getElementById('large-feed'));
                
            }

            // hide login form
            regForm.classList.add("hide");
            regForm.classList.remove("register-field");

            // show feed
            postsBody.classList.remove("hide");
            
        });
});

/*
document.querySelector("#register-button").addEventListener("click", el => {
    registerHandler(data);
});
*/


// Potential example to upload an image
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', uploadImage);




/*

login/reg:
on success, save access token to local storage, make get request to feed using access token, display feed
(reverse order between show feed and login - login first)


*/