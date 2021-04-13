import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function RepoCard() {
  return (
    <>
      <Card
        size="small"
        title="Repo를 등록해주세요"
        extra={
          <Link to="www.naver.com" style={{ color: '#1890ff' }}>
            View Details
          </Link>
        }
        style={{ width: 500, margin: 'auto', marginTop: 10 }}
        actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
        <p>.......</p>
      </Card>
    </>
  );
}
