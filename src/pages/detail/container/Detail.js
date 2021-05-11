import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import useFetchIssue from '../../../common/hook/useFetchIssue';
import { fetchIssue } from '../../../common/util/fetch';
import IssueList from '../component/IssueList';

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

  const getTotalCount = useCallback(
    name => {
      const filteredList = repos.filter(repository => repository.name === name);
      return filteredList[0].issueCount;
    },
    [repoFullName],
  );

  const handlePagination = useCallback(
    (page, perPage) => {
      setIsLoading(state => !state);

      fetchIssue(repoFullName, page, perPage).then(res => {
        setIssues(res);
        setIsLoading(state => !state);
      });
    },
    [repoFullName],
  );

  const totalCount = useMemo(() => getTotalCount(repoFullName), [repoFullName]);

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
        <IssueList
          repoFullName={repoFullName}
          issues={issues}
          isLoading={isLoading}
          totalCount={totalCount}
          handlePagination={handlePagination}
        />
      </IssueSection>
    </DetailWrapper>
  );
}

Detail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
