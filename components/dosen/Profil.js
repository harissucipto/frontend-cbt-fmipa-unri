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
        image
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

const ProfilAdmin = () => (
  <Query query={CURRENT_DOSEN_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;

      return (
        <Card loading={loading} title="Informasi Pengguna Login">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={data.currentDosen.dosen.image} size={200} />
          </div>

          <List>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="user" style={{ backgroundColor: 'teal' }} />}
                title="Nama"
                description={data.currentDosen.dosen.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" style={{ backgroundColor: 'navy' }} />}
                title="NIP"
                description={data.currentDosen.dosen.nip}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="deployment-unit" style={{ backgroundColor: 'black' }} />}
                title="Jurusan"
                description={
                  data.currentDosen.dosen.prodi ? data.currentDosen.dosen.prodi.jurusan.nama : ''
                }
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="cluster" style={{ backgroundColor: 'lime' }} />}
                title="Program Studi"
                description={
                  data.currentDosen.dosen.prodi ? data.currentDosen.dosen.prodi.nama : ''
                }
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" style={{ backgroundColor: 'green' }} />}
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
