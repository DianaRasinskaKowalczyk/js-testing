export default class GitHubSDK {
	constructor(token, owner) {
		this.token = token;
		this.apiLink = "https://api.github.com";
		this.owner = owner;
	}

	getUser(userName) {
		const options = {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `token ${this.token}`,
			},
		};

		return this._fetch(options, `/users/${userName}`);
	}

	getRepos(userName) {
		const options = {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `token ${this.token}`,
			},
		};

		return this._fetch(options, `/users/${userName}/repos`);
	}

	getRepo(userName, repo) {
		const options = {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `token ${this.token}`,
			},
		};

		console.log(options, "@@@");
		return this._fetch(options, `/repos/${userName}/${repo}`);
	}

	sendInvitation(repo, name) {
		const options = {
			method: "PUT",
			credentials: "same-origin",
			redirect: "follow",
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `token ${this.token}`,
			},
			body: JSON.stringify({
				permission: "pull",
			}),
		};

		console.log(options, "&&&");
		return this._fetch(
			options,
			`/repos/${this.owner}/${repo}/collaborators/${name}`
		);
	}

	_fetch(options, additionalPath = "") {
		const url = this.apiLink + additionalPath;
		return fetch(url, options).then(resp => {
			if (resp.ok) {
				if (resp.status === 204) {
					return resp.status;
				}
				return resp.json();
			}
			return Promise.reject(resp);
		});
	}
}
