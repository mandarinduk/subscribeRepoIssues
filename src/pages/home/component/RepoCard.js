import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function RepoCard({ repoName, issueCount, deleteRepo }) {
  const detailPageUrl = `detail/${repoName}`;

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
  repoName: PropTypes.string.isRequired,
  issueCount: PropTypes.number.isRequired,
  deleteRepo: PropTypes.func.isRequired,
};

export default React.memo(RepoCard);
