import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/core';

export default function useFetchIssue(repoName) {
  const [issues, setIssues] = useState([]);
  const octokit = new Octokit();

  const fetchIssue = async repo => {
    const url = `/repos/${repo}/issues?page=1&per_page=10`;

    await octokit.request(`GET ${url}`).then(res => {
      setIssues(res.data);
    });
  };

  useEffect(() => {
    fetchIssue(repoName);
  }, []);

  return [issues, setIssues];
}
