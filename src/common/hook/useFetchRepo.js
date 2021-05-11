import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/core';

export default function useFetchRepo() {
  const [repoList, setRepoList] = useState([]);
  const octokit = new Octokit();

  useEffect(() => {
    let repos = JSON.parse(localStorage.getItem('repos'));

    if (!repos) {
      localStorage.setItem('repos', '[]');
      return;
    }

    repos.forEach(async repo => {
      const url = `/repos/${repo.name}`;
      const {
        data: { full_name: name, open_issues_count: issueCount },
      } = await octokit.request(`GET ${url}`);

      if (repo.issueCount !== issueCount) {
        const updatedList = repos.filter(
          outDatedRepo => outDatedRepo.name !== name,
        );
        localStorage.setItem(
          'repos',
          JSON.stringify([...updatedList, { name, issueCount }]),
        );
        repos = JSON.parse(localStorage.getItem('repos'));
        setRepoList(repos);
      }
    });

    setRepoList(repos);
  }, []);

  return [repoList, setRepoList];
}
