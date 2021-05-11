import { useState, useEffect } from 'react';
import { fetchIssue } from '../util/fetch';

export default function useFetchIssue(repoName) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssue(repoName).then(issueList => setIssues(issueList));
  }, []);

  return [issues, setIssues];
}
