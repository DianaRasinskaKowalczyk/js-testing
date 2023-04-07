export default class GitHubSDK {
	constructor(token) {
		this.token = token;
		this.apiLink = "https://api.github.com";
	}

	getUser(userName) {
		const options = {
			headers: {
				Accept: "application/vnd.github.v3+json",
				Authorization: `token ${this.token}`,
			},
		};

		return this._fetch(options, `/users/${userName}`);
	}

	_fetch(options, additionalPath = "") {
		const url = this.apiLink + additionalPath;
		return fetch(url, options).then(resp => {
			if (resp.ok) {
				return resp.json();
			}
			return Promise.reject(resp);
		});
	}
}
