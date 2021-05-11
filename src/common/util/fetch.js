import { Octokit } from '@octokit/core';
import { message } from 'antd';

export default async function fetchRepo(repo) {
  const octokit = new Octokit();
  const url = `/repos/${repo.ownerName}/${repo.repoName}`;
  try {
    const {
      data: { full_name: name, open_issues_count: issueCount },
    } = await octokit.request(`GET ${url}`);

    const repos = JSON.parse(localStorage.getItem('repos'));
    localStorage.setItem(
      'repos',
      JSON.stringify(
        repos ? [...repos, { name, issueCount }] : [{ name, issueCount }],
      ),
    );
  } catch (e) {
    message.error(
      `입력하신 저장소 => ${repo.ownerName}/${repo.repoName} 와 일치하는 저장소가 없습니다.`,
    );
  }
  return JSON.parse(localStorage.getItem('repos'));
}

export async function fetchIssue(repo, page = 1, perPage = 10) {
  const octokit = new Octokit();
  const url = `/repos/${repo}/issues?page=${page}&per_page=${perPage}`;

  const { data: issueList } = await octokit.request(`GET ${url}`);
  return issueList;
}
