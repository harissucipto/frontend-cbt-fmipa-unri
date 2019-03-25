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
        nip
        prodi {
          id
          nama
          jurusan {
            id
            nama
          }
        }
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
        <Card loading={loading} title="Informasi Pengguna Login">
          <List>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="user" />}
                title="Nama"
                description={data.currentDosen.dosen.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" />}
                title="NIP"
                description={data.currentDosen.dosen.nip}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="deployment-unit" />}
                title="Jurusan"
                description={
                  data.currentDosen.dosen.prodi ? data.currentDosen.dosen.prodi.jurusan.nama : ''
                }
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="cluster" />}
                title="Program Studi"
                description={
                  data.currentDosen.dosen.prodi ? data.currentDosen.dosen.prodi.nama : ''
                }
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title="Email"
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
