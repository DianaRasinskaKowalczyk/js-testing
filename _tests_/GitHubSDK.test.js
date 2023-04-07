import nodeFetch from "node-fetch";
global.fetch = nodeFetch;
import { token } from "../token.js";
import GitHubSDK from "../src/GitHubSDK";

describe("class GitHubSDK", () => {
	describe(".getUser()", () => {
		it("should return a correct login when correct user is provided", () => {
			expect.assertions(1);
			const gh = new GitHubSDK(token);
			const userName = "DianaRasinskaKowalczyk";
			const promise = gh.getUser(userName);

			return promise.then(result => {
				expect(result.login).toBe(userName);
			});
		});
	});
});
