import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar } from 'antd';
import styled from 'styled-components';

const CURRENT_DOSEN_QUERY = gql`
  query {
    currentMahasiswa {
      email
      id

      mahasiswa {
        id
        image
        nama
        nim
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
      if (loading) return <p>loading...</p>;
      if (!data) return <p>loading...s</p>;

      return (
        <Card title="Informasi Pengguna Login" loading={loading}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={data.currentMahasiswa.mahasiswa.image} size={200} />
          </div>

          <List>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="user" />}
                title={<a>Nama</a>}
                description={data.currentMahasiswa.mahasiswa.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" />}
                title={<a>NIM</a>}
                description={data.currentMahasiswa.mahasiswa.nim}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title={<a>Email</a>}
                description={data.currentMahasiswa.email}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="cluster" />}
                title={<a>Jurusan</a>}
                description={data.currentMahasiswa.mahasiswa.prodi.jurusan.nama}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="deployment-unit" />}
                title={<a>Program Studi</a>}
                description={data.currentMahasiswa.mahasiswa.prodi.nama}
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
