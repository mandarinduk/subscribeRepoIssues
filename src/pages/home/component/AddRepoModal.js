import React from 'react';
import { Modal, Input, Typography } from 'antd';
import PropTypes from 'prop-types';

export default function AddRepoModal({
  isModalVisable,
  handleAddRepo,
  handleCloseModal,
  repoFullName,
  setRepoFullName,
}) {
  const { Title, Text } = Typography;
  const { ownerName, repoName } = repoFullName;

  const handleChange = e => {
    const { id, value } = e.target;
    setRepoFullName({ ...repoFullName, [id]: value });
  };

  return (
    <Modal
      title="Repo 정보를 입력해주세요"
      visible={isModalVisable}
      onOk={handleAddRepo}
      onCancel={handleCloseModal}
    >
      <Title level={4}>Example</Title>
      <Text>
        https://github.com/
        <Text code>Owner Name</Text> / <Text code>Repo Name</Text>
      </Text>
      <Input
        id="ownerName"
        value={ownerName}
        onChange={handleChange}
        placeholder="Owner Name"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Input
        id="repoName"
        value={repoName}
        onChange={handleChange}
        placeholder="Repo Name"
      />
    </Modal>
  );
}

AddRepoModal.propTypes = {
  isModalVisable: PropTypes.bool.isRequired,
  handleAddRepo: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  repoFullName: PropTypes.objectOf(PropTypes.object).isRequired,
  setRepoFullName: PropTypes.func.isRequired,
};
