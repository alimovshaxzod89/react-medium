import React from 'react';
import { Layout, Menu, Tag, List, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Text, Link } = Typography;

const staffPicks = [
  { name: 'F. Perry Wilson, MD MSCE', title: 'Guns and Kids: What is “Responsible Gun Ownership”?' },
  { name: 'Rochelle Deans', title: 'The Rise and Fall of NaNoWriMo' },
  { name: 'The Medium Newsletter', title: 'Can AI make art?' },
];

const recommendedTopics = [
  'Mental Health', 'Software Development', 'Design', 
  'Life', 'Artificial Intelligence', 'Culture', 'Blockchain'
];

const followSuggestions = [
  { name: 'Adrian V', desc: '93 lbs down. Writing about Fat Loss.', avatar: null },
  { name: 'Entrepreneurship Handbook', desc: 'How to succeed in entrepreneurship; feat...', avatar: null },
  { name: 'Bella L', desc: 'Your casual mathematician & story teller.', avatar: null },
];

const StaffPicks = () => {
  return (
    <Sider width={300} style={{ backgroundColor: 'white', padding: '16px' }}>
      <Text strong style={{ fontSize: '18px', }}>Staff Picks</Text>
      <div style={{ margin: '16px 0' }} mode="inline">
        {staffPicks.map((item, index) => (
          <div style={{marginBottom: '20px'}} key={index}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{marginBottom: '10px'}}>
                <Avatar style={{fontSize: '10px', width: '20px', height: '20px', marginRight: '10px'}} icon={<UserOutlined />} />
                <Text style={{fontSize: '13px'}}>{item.name}</Text>
              </div>
              <Link style={{fontSize: '14px', fontWeight: '800', color: 'black'}}>{item.title}</Link>
            </div>
          </div>
        ))}
      </div>

      <Text strong style={{ fontSize: '18px' }}>Recommended topics</Text>
      <div style={{ marginTop: '8px', marginBottom: '16px' }}>
        {recommendedTopics.map(topic => (
          <Tag key={topic} style={{ marginBottom: '4px' }}>{topic}</Tag>
        ))}
      </div>

      <Text strong style={{ fontSize: '18px' }}>Who to follow</Text>
      <List
        itemLayout="horizontal"
        dataSource={followSuggestions}
        renderItem={item => (
          <List.Item actions={[<a key="follow">Follow</a>]}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={item.name}
              description={item.desc}
            />
          </List.Item>
        )}
      />
    </Sider>
  );
};

export default StaffPicks;
