import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar, Row, Col } from 'antd';
import styled from 'styled-components';

import ListKelas from './ListKelas';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    mahasiswa(id: $id) {
      id
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
      user {
        id
        email
      }
      kelases {
        id
        nama
        mataKuliah {
          nama
        }
        prodi {
          id
          nama
          jurusan {
            id
            nama
          }
        }
      }
    }
  }
`;

const ProfilAdmin = ({ id }) => (
  <Query query={CURRENT_QUERY} variables={{ id }} fetchPolicy="network-only">
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data) return <p>loading...</p>;
      console.log(data, 'data profil');

      return (
        <Row type="flex" gutter={16} style={{ margin: '40px' }}>
          <Col xs={24} md={8}>
            <Card title="Informasi Akun Mahasiswa" loading={loading}>
              {/* <HeaderAvatar>
            <Avatar size={144} icon="user" />
            <div>
              <p>
                {data.admin.permissions
                  .filter(permission => !['USER'].includes(permission))
                  .join(' ')}
              </p>
            </div>
          </HeaderAvatar> */}

              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="user" />}
                    title={<a>Nama</a>}
                    description={data.mahasiswa.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="info" />}
                    title={<a>NIM</a>}
                    description={data.mahasiswa.nim}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="deployment-unit" />}
                    title={<a>Jurusan</a>}
                    description={data.mahasiswa.prodi.jurusan.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="cluster" />}
                    title={<a>Prodi</a>}
                    description={data.mahasiswa.prodi.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="mail" />}
                    title={<a>Email</a>}
                    description={data.mahasiswa.user.email}
                  />
                </List.Item>
                {/* <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title={<a href="https://ant.design">Email</a>}
                description={data.admin.email}
              />
            </List.Item> */}
              </List>
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card title="Kelas yang diikuti">
              <ListKelas
                kelases={data.mahasiswa.kelases}
                loading={loading}
                idDosen={data.mahasiswa.id}
              />
            </Card>
          </Col>
        </Row>
      );
    }}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_QUERY };
