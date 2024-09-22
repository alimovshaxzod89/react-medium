import React, { useState } from 'react';
import { Layout, Input, Button, Avatar, Popover, message } from 'antd';
import { BellOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import usePostStore from '../store/usePostStore';
import '../styles/StoryDraft.css';

const { Header, Content } = Layout;
const { TextArea } = Input;

const content = (
  <div style={{ width: '260px', color: '#6B6B6B', padding: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <Avatar size={64} icon={<UserOutlined />} />
      <div>
        <p><b>User name</b></p>
        <p>test@gmail.com</p>
      </div>
    </div>
    <hr />
    <Link to='/profilPage'>
      <p style={{color: '#6B6B6B'}}>Profile</p>
    </Link>
    <Link to='/libraryPage'>
      <p style={{color: '#6B6B6B'}}>Library</p>
    </Link>
    <p style={{color: '#6B6B6B', cursor: 'pointer'}}>Stories</p>
    <p style={{color: '#6B6B6B', cursor: 'pointer'}}>Stats</p>
  </div>
);

const StoryDraft = () => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  const { createPost, loading } = usePostStore();

  const handlePublish = async () => {
    if (!title || !story) return;

    // Date format
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const postData = {
      id: Math.floor(Math.random() * 10000).toString(),
      author: 'testUser',
      title,
      text: story,
      description: story,
      likes: 0,
      createdAt: formattedDate,
    };

    try {
      await createPost(postData); 
      message.success('Post published successfully!');
      setTitle('');
      setStory('');
    } catch (error) {
      message.error('Failed to publish the post. Please try again.');
    }
  };

  return (
    <Layout style={{ background: 'white' }}>
      <Header style={{ background: 'white', padding: '0 16px' }}>
        <div className="header-content" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link to="/">
            <div className="logo" style={{ fontSize: '30px', color: 'black' }}>
              Medium
            </div>
          </Link>
          <div className="menu-items">
            <Button
              type="primary"
              style={{ background: '#d9f7be', color: '#389e0d' }}
              onClick={handlePublish}
              disabled={!title || !story || loading}
              loading={loading}
            >
              Publish
            </Button>
            <EllipsisOutlined style={{ fontSize: '24px', marginLeft: '20px' }} />
            <BellOutlined style={{ fontSize: '20px', marginLeft: '20px' }} />
            <Popover content={content} trigger="click">
              <Avatar size="middle" style={{ marginLeft: '20px' }} icon={<UserOutlined />} />
            </Popover>
          </div>
        </div>
      </Header>

      <Content style={{ padding: '0 50px', marginTop: '40px' }}>
        <div className="story-draft">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontSize: '36px', border: 'none', marginBottom: '16px' }}
          />
          <TextArea
            placeholder="Tell your story..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={8}
            style={{ fontSize: '18px', border: 'none' }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default StoryDraft;
