import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { message, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import AddRepoModal from '../component/AddRepoModal';
import RepoCard from '../component/RepoCard';
import fetchRepo from '../../../common/util/fetch';
import {
  MAX_REPO_COUNT,
  INITIAL_REPO_NAME_STATE,
} from '../../../common/constant';
import useFetchRepo from '../../../common/hook/useFetchRepo';

const HomeWrapper = styled.div`
  margin-top: 100px;
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

  span:hover {
    cursor: pointer;
  }
`;

export default function Home() {
  const [repoList, setRepoList] = useFetchRepo();
  const [isModalVisable, setIsModalVisable] = useState(false);
  const [repoFullName, setRepoFullName] = useState(INITIAL_REPO_NAME_STATE);
  const { Title, Text } = Typography;

  const handleAddRepo = useCallback(() => {
    const { ownerName, repoName } = repoFullName;
    const hasRepo =
      repoList.length &&
      repoList.some(repo => {
        return repo.name.toLowerCase() === `${ownerName}/${repoName}`;
      });

    setIsModalVisable(!isModalVisable);
    if (hasRepo) {
      message.error('이미 등록된 Repository입니다.');
      setRepoFullName(INITIAL_REPO_NAME_STATE);
      return;
    }
    fetchRepo(repoFullName).then(repos => setRepoList(repos));
    setRepoFullName(INITIAL_REPO_NAME_STATE);
  }, [repoFullName]);

  const handleOpenModal = () => {
    const isMax = repoList.length === MAX_REPO_COUNT;
    if (isMax) {
      message.error(`최대 ${MAX_REPO_COUNT}개까지만 등록 가능합니다.`);
      return;
    }
    setIsModalVisable(!isModalVisable);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalVisable(!isModalVisable);
    setRepoFullName(INITIAL_REPO_NAME_STATE);
  }, [isModalVisable]);

  const deleteRepo = useCallback(
    name => {
      const repos = JSON.parse(localStorage.getItem('repos'));
      const filteredList = repos.filter(repo => {
        return repo.name !== name;
      });

      setRepoList(filteredList);
      localStorage.setItem('repos', JSON.stringify(filteredList));
    },
    [repoList],
  );

  return (
    <HomeWrapper>
      <Title style={{ textAlign: 'center' }}>
        <Text keyboard>Subscribe 🗞</Text>
      </Title>
      <Title level={2} style={{ textAlign: 'center' }}>
        <Text keyboard>GitHub Public Repository Issues</Text>
      </Title>
      <RepoSection style={{ fontSize: 20 }}>
        <Add>
          <Text onClick={handleOpenModal} keyboard style={{ fontWeight: 600 }}>
            Add Repo
            <PlusCircleOutlined style={{ marginLeft: 8 }} />
          </Text>
        </Add>
        <AddRepoModal
          isModalVisable={isModalVisable}
          handleAddRepo={handleAddRepo}
          handleCloseModal={handleCloseModal}
          repoFullName={repoFullName}
          setRepoFullName={setRepoFullName}
        />
        {repoList.length ? (
          repoList.map(repo => (
            <RepoCard
              key={repo.name}
              repoName={repo.name}
              issueCount={repo.issueCount}
              deleteRepo={deleteRepo}
            />
          ))
        ) : (
          <Text mark style={{ display: 'block', textAlign: 'center' }}>
            Repository를 등록해주세요.
          </Text>
        )}
      </RepoSection>
    </HomeWrapper>
  );
}
