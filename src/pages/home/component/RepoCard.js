import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function RepoCard({ setRepoList, repoName, issueCount }) {
  const detailPageUrl = `detail/${repoName}`;

  const deleteRepo = name => {
    const repos = JSON.parse(localStorage.getItem('repos'));
    const filteredList = repos.filter(repo => {
      return repo.name !== name;
    });

    setRepoList(filteredList);
    localStorage.setItem('repos', JSON.stringify(filteredList));
  };

  return (
    <Card
      size="small"
      title={repoName}
      extra={
        <Link to={detailPageUrl} style={{ color: '#1890ff' }}>
          View Details
        </Link>
      }
      style={{ width: 500, margin: 'auto', marginTop: 10 }}
      actions={[
        <DeleteOutlined onClick={() => deleteRepo(repoName)} key="delete" />,
      ]}
    >
      <p>Total Issue: {issueCount}</p>
    </Card>
  );
}

RepoCard.propTypes = {
  setRepoList: PropTypes.func.isRequired,
  repoName: PropTypes.string.isRequired,
  issueCount: PropTypes.number.isRequired,
};

export default React.memo(RepoCard);
