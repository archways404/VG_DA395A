const axios = require('axios');

async function fetchGitHubEvents(username) {
	const url = `https://api.github.com/users/${username}/events`;
	const response = await axios.get(url);
	return response.data;
}

async function fetchGithubRepositories(username) {
	const url = `https://api.github.com/users/${username}/repos`;
	const response = await axios.get(url);
	return response.data;
}

async function fetchAllGithubRepositories(username, accessToken) {
	const url = `https://api.github.com/users/${username}/repos?type=all`;
	const config = {
		headers: {
			Authorization: `token ${accessToken}`,
			Accept: 'application/vnd.github.v3+json',
		},
	};

	try {
		const response = await axios.get(url, config);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error('Error response from GitHub:', error.response.data);
			console.error('Status code:', error.response.status);
			console.error('Headers:', error.response.headers);
			throw new Error('GitHub API error');
		} else if (error.request) {
			console.error('No response received:', error.request);
			throw new Error('No response from GitHub API');
		} else {
			console.error('Error setting up request:', error.message);
			throw new Error('Error setting up request to GitHub API');
		}
	}
}

module.exports = {
	fetchGitHubEvents,
	fetchGithubRepositories,
	fetchAllGithubRepositories,
};
