// change this when you integrate with the real API, or when u start using the dev server
const API_URL = "http://localhost:8080/data";

/**
 * This is a sample class API which you may base your code on.
 * You don't have to do this as a class.
 */
export default class API {
	/**
	 * Defaults to teh API URL
	 * @param {string} url
	 */
	constructor(url = API_URL) {
		this.url = url;
	}

	makeAPIRequest(path, options) {
		return fetch(path, options)
			.then(res => res.json())
			.catch(err => console.warn(`API_ERROR: ${err.message}`));
	}

	makePostRequest(path, options = {}, body = {}) {
		return fetch(path, {
			method: "POST",
			...options,
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.catch(err => console.warn(`API_ERROR: ${err.message}`));
	}

	makePutRequest(path, options = {}, body = {}) {
		return fetch(path, {
			method: "PUT",
			...options,
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.catch(err => console.warn(`API_ERROR: ${err.message}`));
	}

	/* GET Request */

	/**
	 * @returns feed array in json format
	 */
	getFeed(token) {
		return this.makeAPIRequest(`${this.url}/user/feed`, {
			headers: { Authorization: `Token ${token}` }
		});
	}

	getUsers() {
		return this.makeAPIRequest("users.json");
	}

	/**
	 * @returns auth'd user in json format
	 */
	getMe(token) {
		return this.makeAPIRequest("me.json");
	}

	login(username, password) {
		return this.makePostRequest(
			`${this.url}/auth/login`,
			{ headers: { "Content-Type": "application/json" } },
			{
				username,
				password
			}
		);
	}

	signup(username, password, email, name) {
		return this.makePostRequest(
			`${this.url}/auth/signup`,
			{ headers: { "Content-Type": "application/json" } },
			{
				username,
				password,
				email,
				name
			}
		);
	}

	like(id, token) {
		return this.makePutRequest(`${this.url}/post/like?id=${id}`, {
			headers: { Authorization: `Token ${token}` }
		});
	} // same thing with comments but with body

	//fetch("http://www.abx.com?x=2&y=3")

	/* POST Requests */
	// login(username password)
	// signup
}

/*
    1. login - holding the token
    2. save token into localstorage

*/
