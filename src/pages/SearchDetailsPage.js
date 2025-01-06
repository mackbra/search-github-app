import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SearchDetailsPage = () => {
  const { repoId } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repositories/${repoId}`)
      .then(response => response.json())
      .then(data => setRepo(data))
      .catch(error => console.error(error));
  }, [repoId]);

  if (!repo) return <p>Loading...</p>;

  return (
    <div className="details-display">
      <h1>Repository Details</h1>
      <p><strong>Name:</strong> {repo.name}</p>
      <p><strong>Owner:</strong> <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer">{repo.owner.login}</a></p>
      <p><strong>Description:</strong> {repo.description || 'N/A'}</p>
      <p><strong>Stars:</strong> {repo.stargazers_count}</p>
      <p><strong>Forks:</strong> {repo.forks_count}</p>
      <p><strong>Open Issues:</strong> {repo.open_issues_count}</p>
      <p><strong>License:</strong> {repo.license?.name || 'None'}</p>
      <Link to="/">Back to Search</Link>
    </div>
  );
};

export default SearchDetailsPage;
