// importing named exports we use brackets
import { createPostTile, uploadImage, navHandler, loginHandler, registerHandler } from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';

const api  = new API();

// we can use this single api request multiple times
const feed = api.getFeed();
const users = api.getUsers();

// Load posts
feed.then(posts => {
    const reversePosts = posts.reverse();       // reverse to match chronological order
    reversePosts.reduce((parent, post) => {

        parent.appendChild(createPostTile(post));
        return parent;

    }, document.getElementById('large-feed'))
});


// Nav bar event handler
document.querySelector(".nav").addEventListener("click", el => {
    navHandler(el.target.innerHTML);
});

users.then(data => {
    document.querySelector("#login-button").addEventListener("click", el => {
        console.log('login click');
        loginHandler(data);
    });

    document.querySelector("#register-button").addEventListener("click", el => {
        console.log('register click');
        registerHandler(data);
    });
});


// Potential example to upload an image
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', uploadImage);



