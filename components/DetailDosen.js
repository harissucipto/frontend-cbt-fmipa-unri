import React from 'react';
import { Layout, Card, List, Avatar, Input } from 'antd';
import styled from 'styled-components';
const { Content } = Layout;
const { Search } = Input;

const HeaderAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  div {
    margin-top: 20px;
    text-align: center;
    h2 {
      margin-bottom: 4px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
`;

const ProfilAdmin = () => (
  <Content>
    <Card style={{ margin: '20px', padding: '24px' }}>
      <Search
        placeholder="input search text"
        onSearch={value => console.log(value)}
        width={240}
        enterButton
      />

      <HeaderAvatar>
        <Avatar size={144} icon="user" />
        <div>
          <h2>Haris</h2>
          <p>Admin CBT FMIPA UR</p>
        </div>
      </HeaderAvatar>

      <List>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="mail" />}
            title={<a href="https://ant.design">Email</a>}
            description="Haris Sucipto"
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="mail" />}
            title={<a href="https://ant.design">Permission</a>}
            description="ADMIN"
          />
        </List.Item>
      </List>
    </Card>
  </Content>
);

export default ProfilAdmin;
