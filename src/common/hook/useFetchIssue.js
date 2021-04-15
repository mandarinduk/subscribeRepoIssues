import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/core';

export default function useFetchIssue() {
  const [issues, setIssues] = useState([]);
  const octokit = new Octokit();

  const fetchIssue = repoName => {
    const url = `/repos/${repoName}/issues`;

    octokit.request(`GET ${url}`).then(res => {
      setIssues([...issues]);
      console.log(res);
    });
  };

  useEffect(() => {
    const repos = JSON.parse(localStorage.getItem('repos'));
    repos.forEach(repo => {
      fetchIssue(repo.repoName);
    });

    // const repoIssues = JSON.parse(localStorage.getItem(key));
    // setIssues([...issues, { repoName: key, repoIssues }]);
  }, []);

  return issues;
}
