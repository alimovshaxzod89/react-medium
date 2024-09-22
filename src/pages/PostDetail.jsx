import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Space, Avatar, Divider, Button, Row, Col, Spin } from 'antd';
import { UserOutlined, LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import usePostStore from '../store/usePostStore';

const { Title, Text, Paragraph } = Typography;

const PostDetail = () => {
  const { id } = useParams();
  const { posts, fetchPosts, toggleLike, loading } = usePostStore();
  const [post, setPost] = useState(null);
  

  useEffect(() => {
    if (posts.length === 0) {
        fetchPosts();
    } else {
        const selectedPost = posts.find((p) => p.id == parseInt(id));
        setPost(selectedPost);
        console.log(posts[0].id, parseInt(id));
    }
  }, [posts, id, fetchPosts]);

  useEffect(() => {
    if (posts.length > 0) {
      const selectedPost = posts.find((p) => p.id == parseInt(id));
      setPost(selectedPost);
    }
  }, [posts, id]);

  const handleLikeToggle = (postId, currentLikes, liked) => {
    toggleLike(postId, currentLikes, liked);
  };

  if (loading) return <Spin tip="Loading post..." size="large" />;
  if (!post) return <p>Post not found</p>;

  return (

    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Article Title */}
      <Title level={1}> {post.title} </Title>
      <Text style={{ fontSize: '18px', color: '#6B6B6B' }}>
        {post.text}
      </Text>

      {/* Author Information */}
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Space direction="vertical">
            <Text strong>{post.author} </Text>
            <Text style={{ fontSize: '13px', color: '#6B6B6B' }}>
              Published in Towards AI · 9 min read · {post.createdAt}
            </Text>
          </Space>
        </Space>
      </div>

      {/* Social & Stats */}
      <Row style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Space>
            <LikeOutlined
                onClick={() => handleLikeToggle(post.id, post.likes, post.liked)}
                style={{ cursor: 'pointer', color: post.liked ? 'red' : 'gray' }}
            />
            <Text> {post.likes} </Text>
          </Space>
        </Col>
        <Col span={6}>
          <Space>
            <CommentOutlined />
            <Text>0</Text>
          </Space>
        </Col>
        <Col span={6}>
          <Button type="text" icon={<ShareAltOutlined />} />
        </Col>
      </Row>

      <Divider />

      {/* Article Content */}
      <div>
        <Paragraph>
          The process of RAG is complex, with numerous components. How can we determine the existing RAG methods and
          their optimal combinations to identify the best RAG practices?
        </Paragraph>

        <Paragraph>
          This article introduces a new study titled <Text strong>“Searching for Best Practices in Retrieval-Augmented
          Generation”</Text>. This study aims to address this problem.
        </Paragraph>

        <Paragraph>
          This article is divided into four main parts. First, it introduces the typical RAG process. Next, it presents best
          practices for each RAG module. Then, it provides a comprehensive evaluation. Finally, it shares my thoughts and
          insights, and concludes with a summary.
        </Paragraph>
      </div>
    </div>
  );
};

export default PostDetail;
