import React from 'react';
import { Typography, List, Pagination, Skeleton } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function IssueList({ issues, isLoading, totalCount, handlePagination }) {
  const { Text } = Typography;

  return (
    <>
      <List
        footer={
          <Pagination
            size="small"
            total={totalCount}
            onChange={(page, perPage) => handlePagination(page, perPage)}
          />
        }
        bordered
        dataSource={issues}
        renderItem={issue => (
          <List.Item style={{ display: 'block' }}>
            <Skeleton loading={isLoading} active paragraph={{ rows: 1 }} />
            {!isLoading && (
              <>
                <GithubOutlined style={{ marginLeft: 10, marginRight: 10 }} />
                <a href={issue.html_url} target="blank">
                  <Text mark underline style={{ marginRight: 10 }}>
                    {issue.number}
                  </Text>
                </a>
                {issue.title}
              </>
            )}
          </List.Item>
        )}
      />
    </>
  );
}

IssueList.propTypes = {
  issues: PropTypes.objectOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
};

export default React.memo(IssueList);
