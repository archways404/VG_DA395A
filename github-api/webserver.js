const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const {
	fetchGitHubEvents,
	fetchGithubRepositories,
	fetchAllGithubRepositories,
} = require('./functions/fetchData');

const {
	analyzeCommitData,
	parseRepositoryData,
	parseRepositoryDataWithStats,
} = require('./functions/analyzeData');

//? ROUTES
app.get('/github/:username', async (req, res) => {
	const { username } = req.params;
	try {
		const userData = await fetchGitHubEvents(username);
		const commitData = analyzeCommitData(userData);
		res.json(commitData);
	} catch (error) {
		console.error('Error fetching GitHub data:', error);
		res.status(500).json({ error: 'Failed to fetch data' });
	}
});

app.get('/github/repos/:username', async (req, res) => {
	const { username } = req.params;
	try {
		const userData = await fetchGithubRepositories(username);
		/*
		const userData = await fetchAllGithubRepositories(
			username,
			'GITHUB_ACCESS_TOKEN'
		);
    */
		//const parsedData = parseRepositoryData(userData);
		const parsedData = parseRepositoryDataWithStats(userData);
		res.json(parsedData);
	} catch (error) {
		console.error('Error fetching GitHub data:', error);
		res.status(500).json({ error: 'Failed to fetch data' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
