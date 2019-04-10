/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar, Row, Col } from 'antd';

import ListKelas from './ListKelas';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    mahasiswa(id: $id) {
      id
      nama
      nim
      image
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
        passwordKasih
      }
      kelases {
        id
        nama
        mataKuliah {
          id
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
    {({ data, loading }) => (
      /* if (loading) return <p>Loading...</p>;
      if (!data) return <p>loading...</p>;
      console.log(data, 'data profil'); */

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

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={data.mahasiswa.image} size={200} />
            </div>

            <List>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="user" style={{ backgroundColor: 'maroon' }} />}
                  title={<a>Nama</a>}
                  description={data.mahasiswa.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="info" style={{ backgroundColor: 'brown' }} />}
                  title={<a>NIM</a>}
                  description={data.mahasiswa.nim}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="deployment-unit" style={{ backgroundColor: 'navy' }} />}
                  title={<a>Jurusan</a>}
                  description={data.mahasiswa.prodi.jurusan.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="cluster" style={{ backgroundColor: 'orange' }} />}
                  title={<a>Prodi</a>}
                  description={data.mahasiswa.prodi.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" style={{ backgroundColor: 'black' }} />}
                  title={<a>Email</a>}
                  description={data.mahasiswa.user.email}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="key" style={{ backgroundColor: 'lime' }} />}
                  title={<a>Password</a>}
                  description={data.mahasiswa.user.passwordKasih}
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
    )}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_QUERY };
