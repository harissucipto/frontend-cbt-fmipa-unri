import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar } from 'antd';
import styled from 'styled-components';

const CURRENT_DOSEN_QUERY = gql`
  query {
    currentDosen {
      email
      id

      dosen {
        id
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
  <Query query={CURRENT_DOSEN_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;

      return (
        <Card style={{ margin: '20px', padding: '24px', maxWidth: '480px' }} loading={loading}>
          <HeaderAvatar>
            <Avatar size={144} icon="user" />
            <div>
              <p>
                {data.currentDosen.permissions
                  .filter(permission => !['USER'].includes(permission))
                  .join(' ')}
              </p>
            </div>
          </HeaderAvatar>

          <List>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title={<a href="https://ant.design">Nama</a>}
                description={data.currentDosen.dosen.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title={<a href="https://ant.design">Email</a>}
                description={data.currentDosen.email}
              />
            </List.Item>
          </List>
        </Card>
      );
    }}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_DOSEN_QUERY };
