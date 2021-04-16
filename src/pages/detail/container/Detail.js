import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, List, Pagination, Skeleton } from 'antd';
import { HomeOutlined, GithubOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Octokit } from '@octokit/core';
import useFetchIssue from '../../../common/hook/useFetchIssue';

const DetailWrapper = styled.div`
  margin-top: 100px;
`;

const IssueSection = styled.div`
  margin: 60px auto;
  padding: 16px;
  width: 700px;
  background-color: #ececec;
  border-radius: 6px;
`;

const PushHome = styled.div`
  text-align: right;

  span:hover {
    cursor: pointer;
  }
`;

export default function Detail({ match }) {
  const { owner, repo } = match.params;
  const repoFullName = `${owner}/${repo}`;
  const [issues, setIssues] = useFetchIssue(repoFullName);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { Title, Text } = Typography;
  const repos = JSON.parse(localStorage.getItem('repos'));

  const getTotalCount = name => {
    const filteredList = repos.filter(repository => repository.name === name);
    return filteredList[0].issueCount;
  };

  const handlePagination = (page, perPage) => {
    setIsLoading(state => !state);
    const octokit = new Octokit();
    const url = `/repos/${repoFullName}/issues?page=${page}&per_page=${perPage}`;

    octokit.request(`GET ${url}`).then(res => {
      setIssues(res.data);
      setIsLoading(state => !state);
    });
  };

  return (
    <DetailWrapper>
      <Title style={{ textAlign: 'center' }}>
        <Text keyboard>{repoFullName} Issues</Text>
      </Title>
      <IssueSection style={{ fontSize: 20 }}>
        <PushHome>
          <Text
            onClick={() => history.push('/')}
            keyboard
            style={{ fontWeight: 600 }}
          >
            Go Home
            <HomeOutlined style={{ marginLeft: 8 }} />
          </Text>
        </PushHome>
        <List
          footer={
            <Pagination
              size="small"
              total={getTotalCount(repoFullName)}
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
      </IssueSection>
    </DetailWrapper>
  );
}

Detail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
