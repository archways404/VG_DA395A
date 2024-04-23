function analyzeCommitData(events) {
	let totalCommits = 0;
	const commitsByDay = {};
	events.forEach((event) => {
		if (event.type === 'PushEvent') {
			totalCommits += event.payload.commits.length;
			const date = new Date(event.created_at).toDateString();
			if (commitsByDay[date]) {
				commitsByDay[date] += event.payload.commits.length;
			} else {
				commitsByDay[date] = event.payload.commits.length;
			}
		}
	});
	return { totalCommits, commitsByDay };
}

function parseRepositoryData(repositories) {
	return repositories.map((repo) => ({
		name: repo.name,
		html_url: repo.html_url,
		created_at: repo.created_at,
		updated_at: repo.updated_at,
		language: repo.language,
	}));
}

function parseRepositoryDataWithStats(repositories) {
	const languageCount = {};

	const detailedRepos = repositories.map((repo) => {
		const language = repo.language || 'None';
		if (languageCount[language]) {
			languageCount[language] += 1;
		} else {
			languageCount[language] = 1;
		}
		return {
			name: repo.name,
			html_url: repo.html_url,
			created_at: repo.created_at,
			updated_at: repo.updated_at,
			language: repo.language,
		};
	});
	const totalRepositories = repositories.length;
	return {
		detailedRepos,
		stats: {
			totalRepositories,
			languages: languageCount,
		},
	};
}

module.exports = {
	analyzeCommitData,
	parseRepositoryData,
	parseRepositoryDataWithStats,
};
