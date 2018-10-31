/* returns an empty array of size max */
export const range = max => Array(max).fill(null);

/* returns a randomInteger */
export const randomInteger = (max = 1) => Math.floor(Math.random() * max);

/* returns a randomHexString */
const randomHex = () => randomInteger(256).toString(16);

/* returns a randomColor */
export const randomColor = () =>
	"#" +
	range(3)
		.map(randomHex)
		.join("");

/**
 * You don't have to use this but it may or may not simplify element creation
 *
 * @param {string}  tag     The HTML element desired
 * @param {any}     data    Any textContent, data associated with the element
 * @param {object}  options Any further HTML attributes specified
 */
export function createElement(tag, data, options = {}) {
	const el = document.createElement(tag);
	el.textContent = data;

	// Sets the attributes in the options object to the element
	return Object.entries(options).reduce((element, [field, value]) => {
		element.setAttribute(field, value);
		return element;
	}, el);
}

/**
 * Given a post, return a tile with the relevant data
 * @param   {object}        post
 * @returns {HTMLElement}
 */
export function createPostTile(post) {
	// parent post div
	const section = createElement("section", null, { class: "post" });

	// create each post element
	section.appendChild(
		createElement("h2", post.meta.author, { class: "post-title" })
	);

	// Date in correct format
	const date = new Date(parseInt(post.meta.published));
	section.appendChild(createElement("p", date, { class: "post-date" }));

	// if post description is included
	if (post.meta.description_text !== "") {
		section.appendChild(
			createElement("p", post.meta.description_text, { class: "post-content" })
		);
	}

	// button:
	// tag = "button", data = "Like", options = { onclick: "function()" }

	// image
	const img = new Image();
	img.src = `data:image/jpeg;base64,${post.src}`;
	img.alt = post.meta.description_text;
	img.className = "feed-img";
	section.appendChild(img);

	// likes
	if (post.meta.likes !== []) {
		section.appendChild(
			createElement("p", `${post.meta.likes.length} people like this.`, {
				class: "post-likes-comms"
			})
		);
	}

	return section;
}

// Given an input element of type=file, grab the data uploaded for use
export function uploadImage(event) {
	const [file] = event.target.files;

	const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
	const valid = validFileTypes.find(type => type === file.type);

	// bad data, let's walk away
	if (!valid) return false;

	// if we get here we have a valid image
	const reader = new FileReader();

	reader.onload = e => {
		// do something with the data result
		const dataURL = e.target.result;
		const image = createElement("img", null, { src: dataURL });
		document.body.appendChild(image);
	};

	// this returns a base64 image
	reader.readAsDataURL(file);
}

/* 
    Reminder about localStorage
    window.localStorage.setItem('AUTH_KEY', someKey);
    window.localStorage.getItem('AUTH_KEY');
    localStorage.clear()
*/
export function checkStore(key) {
	if (window.localStorage) return window.localStorage.getItem(key);
	else return null;
}

// Handles clicks on elements in nav bar
export function navHandler(el) {
	const body = document.querySelector("#large-feed");
	const loginForm = document.querySelector("#login-form");
	const registerForm = document.querySelector("#register-form");

	if (el === "Login") {
		body.classList.add("hide");
		loginForm.classList.remove("hide");
		loginForm.classList.add("user-field");
		registerForm.classList.add("hide");
		registerForm.classList.remove("register-field");
	} else if (el === "Register") {
		body.classList.add("hide");
		registerForm.classList.remove("hide");
		registerForm.classList.add("register-field");
		loginForm.classList.add("hide");
		loginForm.classList.remove("user-field");
	} else if (el === "Logout") {
		const posts = document.getElementsByClassName("post");
		Array.from(posts).forEach(data => {
			data.parentNode.removeChild(data);
		});

		const navLogout = document.querySelector("#nav-logout");
		navLogout.classList.add("hide");
	}
}
