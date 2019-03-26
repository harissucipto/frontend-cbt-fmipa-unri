import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar } from 'antd';
import styled from 'styled-components';

const CURRENT_ADMIN_QUERY = gql`
  query {
    admin {
      email

      admin {
        nama
      }
      permissions
    }
  }
`;

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
  <Query query={CURRENT_ADMIN_QUERY}>
    {({ data, loading }) => (
      <Card title="Informasi Pengguna Login" loading={loading}>
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="user" />}
              title={<a>Nama</a>}
              description={data.admin.admin.nama}
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="mail" />}
              title={<a>Email</a>}
              description={data.admin.email}
            />
          </List.Item>
        </List>
      </Card>
    )}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_ADMIN_QUERY };
