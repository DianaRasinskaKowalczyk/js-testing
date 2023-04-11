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

		return this._fetch(options, `/users/${userName}/${repo}`);
	}

	sendInvitation(repo, name) {
		const options = {
			method: "PUT",
			credentials: "same-origin",
			redirect: "follow",
			headers: {
				Accept: "application/vnd.github.v3+json",
				Authorization: `token ${token}`,
			},
			body: JSON.stringify({
				permission: "pull",
			}),
		};
		return this._fetch(
			options,
			`/repos/${this.owner}/${repo}/collaborators/${name}`
		);
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
