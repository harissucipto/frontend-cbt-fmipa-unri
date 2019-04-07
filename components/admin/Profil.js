import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar, Icon } from 'antd';
import styled from 'styled-components';

const CURRENT_ADMIN_QUERY = gql`
  query {
    admin {
      email

      admin {
        nama
        image
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
    {({ data, loading }) => {
      if (loading) return <p>loading...</p>;
      return (
        <Card title="Informasi Pengguna Login" loading={loading}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={data.admin.admin.image} size={200} />
          </div>

          <List>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="user" />}
                title="Nama"
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
      );
    }}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_ADMIN_QUERY };
