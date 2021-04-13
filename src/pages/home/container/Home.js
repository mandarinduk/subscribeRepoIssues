import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import RepoCard from '../component/RepoCard';

const { Title, Text } = Typography;

const HomeWrapper = styled.div`
  margin-top: 100px;
`;

const StyledTitle = styled(Title)`
  text-align: center;
`;

const RepoSection = styled.div`
  margin: 60px auto;
  padding: 16px;
  width: 700px;
  background-color: #ececec;
  border-radius: 6px;
`;

const Add = styled.div`
  text-align: right;

  &:hover {
    cursor: pointer;
  }
`;

export default function Home() {
  return (
    <HomeWrapper>
      <StyledTitle>
        <Text keyboard>Subscribe 🗞</Text>
      </StyledTitle>
      <StyledTitle level={2}>
        <Text keyboard>GitHub Public Repository Issues</Text>
      </StyledTitle>
      <RepoSection style={{ fontSize: 20 }}>
        <Add>
          <Text keyboard style={{ fontWeight: 600 }}>
            Add Repo
            <PlusCircleOutlined style={{ marginLeft: 8 }} />
          </Text>
        </Add>
        <RepoCard />
        <RepoCard />
        <RepoCard />
        <RepoCard />
      </RepoSection>
    </HomeWrapper>
  );
}
