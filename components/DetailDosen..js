import React from 'react';
import User from './User';
import { Layout, Card, List, Avatar } from 'antd';
import styled from 'styled-components';
const { Content } = Layout;

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
  <User>
    {({ data: { me }, loading }) => (
      <Card style={{ margin: '20px', padding: '24px' }} loading={loading}>
        <HeaderAvatar>
          <Avatar size={144} icon="user" />
          <div>
            <h2>
              {me.admin.nama} {me.id}
            </h2>
            <p>
              {me.permissions.filter(permission => !['USER'].includes(permission)).join(' ')} CBT
              FMIPA UR
            </p>
          </div>
        </HeaderAvatar>

        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="mail" />}
              title={<a href="https://ant.design">Email</a>}
              description={me.email}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="mail" />}
              title={<a href="https://ant.design">Permission</a>}
              description={me.permissions.reduce((acc, prev) => `${acc} ${prev},`, '')}
            />
          </List.Item>
        </List>
      </Card>
    )}
  </User>
);

export default ProfilAdmin;
