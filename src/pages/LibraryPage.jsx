import React, { useEffect, useState } from 'react';
import {
  Menu,
  List,
  Avatar,
  Space,
  Typography,
  Spin,
  Popover,
} from 'antd';
import {
  UserOutlined,
  SaveOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import usePostStore from '../store/usePostStore';
import Sider from 'antd/es/layout/Sider';
import { Link } from 'react-router-dom';
import CustomHeader from '../components/Header';

const { Text } = Typography;

const LibraryPage = () => {
  const [current, setCurrent] = useState('yourlists');
  const { savedPosts, fetchSavedPosts, loading, error, deleteSavedPost } = usePostStore();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    fetchSavedPosts();
  }, [fetchSavedPosts]);

  return (
    <>
      <CustomHeader />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '680px',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid #f0f0f0',
              margin: '50px 0',
            }}
          >
            <div style={{ marginLeft: '16px' }}>
              <h1>Your library</h1>
            </div>
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode="horizontal"
              style={{
                borderBottom: 'none',
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <Menu.Item key="yourlists">Your Lists</Menu.Item>
              <Menu.Item key="savedlists">Saved Lists</Menu.Item>
              <Menu.Item key="highlights">Highlights</Menu.Item>
              <Menu.Item key="readinghistory">Reading history</Menu.Item>
            </Menu>
          </div>

          {loading && <Spin tip="Loading posts..." size="large" />}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <List
            itemLayout="vertical"
            size="large"
            dataSource={savedPosts}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Space style={{ marginBottom: 12 }}>
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Text type="black" style={{ fontSize: '13px' }}>
                      {item.author || 'Unknown Author'}
                    </Text>
                  </Space>
                </Space>

                <Typography.Title level={4}>
                  <a href="#" style={{ color: 'black', fontSize: '24px' }}>
                    {item.title}
                  </a>
                </Typography.Title>

                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Space size="large">
                    <p>{item.createdAt || 'N/A'}</p>
                  </Space>
                  <Space size="large">

                    <Popover
                      content={
                        <div style={{ width: '209px', color: '#6B6B6B', padding: '4px' }}>
                          <p>Edit Story</p>
                          <p>Pin this stort to your profile</p>
                          <hr />
                          <p>Story Settings</p>
                          <p>Story Stats</p>
                          <hr />
                          <p>Hide responses</p>
                          <p
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => deleteSavedPost(item.id)}
                          >
                            Delete Story
                          </p>
                        </div>
                      }
                      trigger="click"
                    >
                      <EllipsisOutlined
                        style={{ fontSize: '18px', fontWeight: '600' }}
                      />
                    </Popover>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        </div>

        {/* Vertical line */}
        <div
          style={{
            width: '1px',
            backgroundColor: '#e0e0e0',
            margin: '0 20px',
            height: 'auto',
          }}
        />

          
        <Sider width={120} theme="light">
          <Avatar size={64} icon={<UserOutlined />} />
          <Text strong style={{ display: 'block', marginTop: '8px' }}>
            Alimovshaxzod
          </Text>
          <Link
            href="#"
            style={{ color: '#52c41a', marginTop: '8px', display: 'block' }}
          >
            Edit profile
          </Link>
        </Sider>
      </div>
    </>
  );
};

export default LibraryPage;
