import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
import token from "../token.js";
import GitHubSDK from "../src/GitHubSDK.js";

describe("class GitHubSDK", () => {
	describe(".getUser()", () => {
		it("should return a correct login when correct user is provided", () => {
			expect.assertions(1);
			const gh = new GitHubSDK();
			const userName = "DianaRasinskaKowalczyk";
			const promise = gh.getUser(userName);

			return promise.then(result => {
				expect(result.login).toBe(userName);
			});
		});

		it("Should reject with status code 404 when incorrect username provided", () => {
			expect.assertions(1);
			const gh = new GitHubSDK();
			const username = "wrong-username-which-is-unique";

			const promise = gh.getUser(username);

			return promise.catch(error => {
				expect(error.status).toBe(404);
			});
		});
	});

	describe(".getRepos()", () => {
		it("should return a list of repositories if a username exists", () => {
			expect.assertions(1);
			const gh = new GitHubSDK(token);
			const userName = "DianaRasinskaKowalczyk";

			const promise = gh.getRepos(userName);

			return promise.then(result => {
				expect(Array.isArray(result)).toBeTruthy();
			});
		});
	});

	describe(".getRepo()", () => {
		it("should return repo's name if user and repo exist", () => {
			expect.assertions(1);
			const gh = GitHubSDK(token);
			const userName = "DianaRasinskaKowalczyk";
			const repo = "task-js-basics";

			const promise = gh.getRepo(userName, repo);

			return promise.then(result => {
				expect(result.name).toBe(repo);
			});
		});
	});

	describe(".sendInvitation()", () => {
		it("should return true if a user exists", () => {
			expect.assertions(1);
			const gh = GitHubSDK(token);
			const userName = "devmentor.pl";
			const repo = "task-js-basics";

			const promise = gh.sendInvitation(repo, userName);

			return promise.then(result => {
				expect(result).toBeTruthy;
			});
		});
	});
});
