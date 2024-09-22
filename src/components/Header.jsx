import React from 'react';
import { Layout, Input, Button, Avatar, Space, Popover } from 'antd';
import {
  EditOutlined,
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  SaveOutlined,
  ProfileOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const content = (
  <div style={{ width: '260px', color: '#6B6B6B', padding: '24px' }}>
    <Link to="/profilPage">
      <p style={{ color: '#6B6B6B' }}>
        {' '}
        <UserOutlined style={{ fontSize: '20px', marginRight: '12px' }} />{' '}
        Profile
      </p>
    </Link>
    <Link to="/libraryPage">
      <p style={{ color: '#6B6B6B' }}>
        <SaveOutlined style={{ fontSize: '20px', marginRight: '12px' }} />
        Library
      </p>
    </Link>
    <p></p>
    <p>
      <ProfileOutlined style={{ fontSize: '20px', marginRight: '12px' }} />
      Stories
    </p>
    <p>
      <BarChartOutlined style={{ fontSize: '20px', marginRight: '12px' }} />
      Stories
    </p>

    <hr />
    <p>Settings</p>
    <p>Refine recommendations</p>
    <p>Manage pubications</p>
    <p>Help</p>

    <hr />
    <p>Become a Medium member</p>
    <p>Create a Mastodon account</p>
    <p>Apply for author verification</p>
    <p>Apply to the Partner program</p>
    <p>Gift a membership</p>

    <hr />
    <p>Sign out</p>
    <p>test@gmail.com</p>
  </div>
);

const CustomHeader = () => {
  return (
    <Header
      style={{
        backgroundColor: 'white',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div style={{ display: 'flex' }}>
        {/* Logo */}
        <Link to="/">
          <div
            style={{
              fontSize: '30px',
              fontWeight: 'bold',
              marginRight: '20px',
              color: 'black',
            }}
          >
            Medium
          </div>
        </Link>

        {/* Search Input */}
        <Input
          placeholder="Search"
          prefix={
            <SearchOutlined
              style={{
                fontSize: '17.5px',
                color: 'rgba(0, 0, 0, 0.3)',
                marginRight: '5px',
              }}
            />
          }
          style={{
            width: '240px',
            margin: '12px 0',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#f6f6f6',
          }}
        />
      </div>

      {/* Icons and Avatar */}
      <Space size="large">
        <Link to="/storyDraft">
          <Button
            type="text"
            icon={
              <EditOutlined
                style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '18px' }}
              />
            }
            style={{
              fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 0.5)',
              fontSize: '14px',
              fontWeight: '400',
            }}
          >
            Write
          </Button>
        </Link>
        <BellOutlined
          style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '20px' }}
        />

        <div style={{ cursor: 'pointer' }}>
          <Popover content={content} trigger="click">
            <Avatar size="middle" icon={<UserOutlined />} />
          </Popover>
        </div>
      </Space>
    </Header>
  );
};

export default CustomHeader;
