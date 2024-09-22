import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, List, Avatar, Space, Typography, Image, Spin, Modal, message } from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  UserOutlined,
  PlusOutlined,
  RightOutlined,
  SaveOutlined,
  EllipsisOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import usePostStore from '../store/usePostStore';

const { Text } = Typography;
const { confirm } = Modal;

const IconText = ({ icon, text, onClick, style }) => (
  <Space onClick={onClick} style={style}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Articles = () => {
  const [current, setCurrent] = useState('foryou');
  const { posts, fetchPosts, deletePost, toggleLike, savePost, loading, error } = usePostStore();
  const navigate = useNavigate(); 

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const showDeleteConfirm = (postId) => {
    confirm({
      content: (
        <>
          <h3>Got it, we'll recommend fewer like this</h3>
          <p>You can additionally take any of the actions below.</p>
        </>
      ),
      okText: 'Done',
      okType: 'danger',
      cancelText: 'Undo',
      onOk() {
        deletePost(postId);
        message.success('Post deleted successfully');
      },
      onCancel() {
        message.info('Post deletion cancelled');
      },
    });
  };

  const handleLikeToggle = (postId, currentLikes, liked) => {
    toggleLike(postId, currentLikes, liked);
  };

  const handleSavePost = (post) => {
    savePost(post); 
  };

  const handleNavigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ borderBottom: '1px solid #f0f0f0', marginTop: '25px', marginBottom: '25px' }}>
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Menu.Item key="plus" icon={<PlusOutlined />} />
          <Menu.Item key="foryou">For you</Menu.Item>
          <Menu.Item key="following">Following</Menu.Item>
          <Menu.Item key="leadership">Leadership</Menu.Item>
          <Menu.Item key="deeplearning">Deep Learning</Menu.Item>
          <Menu.Item key="books">Books</Menu.Item>
          <Menu.Item key="work">Work</Menu.Item>
          <Menu.Item key="webdev">Web Development</Menu.Item>
          <Menu.Item key="more" icon={<RightOutlined />} />
        </Menu>
      </div>

      {loading && <Spin tip="Loading posts..." size="large" />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <List
        itemLayout="vertical"
        size="large"
        style={{ paddingRight: '100px' }}
        dataSource={posts}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={<Image width={150} height={100} alt="logo" src={item.image || 'https://via.placeholder.com/150'} />}
          >
            <Space style={{ marginBottom: 12 }}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Text type="black" style={{ fontSize: '13px' }}>
                  {item.author || 'Unknown Author'}
                </Text>
              </Space>
            </Space>

            <Typography.Title level={4}>
              <a
                onClick={() => handleNavigateToPost(item.id)}
                style={{ color: 'black', fontSize: '24px', cursor: 'pointer' }}
              >
                {item.title}
              </a>
            </Typography.Title>

            <Text>
              <span style={{ fontSize: '16px', color: '#6B6B6B' }}>{item.description}</span>
            </Text>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Space size="large">
                <IconText icon={StarOutlined} text={item.createdAt || 'N/A'} />
                <IconText
                  icon={LikeOutlined}
                  text={item.likes || '0'}
                  onClick={() => handleLikeToggle(item.id, item.likes, item.liked)}
                  style={{ cursor: 'pointer', color: item.liked ? 'red' : 'gray' }}
                />
                <IconText icon={MessageOutlined} text={item.comments || '0'} />
              </Space>
              <Space size="large">
                <MinusCircleOutlined
                  style={{ fontSize: '18px', color: 'red' }}
                  onClick={() => showDeleteConfirm(item.id)}
                />
                <SaveOutlined
                  style={{ fontSize: '18px', cursor: 'pointer' }}
                  onClick={() => handleSavePost(item)} 
                />
                <EllipsisOutlined style={{ fontSize: '18px', fontWeight: '600' }} />
              </Space>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Articles;
