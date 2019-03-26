import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar, Layout, Table, Row, Col } from 'antd';
import styled from 'styled-components';

import ListKelas from './ListKelas';
import ListMataKuliah from './ListMataKuliah';

const CURRENT_DOSEN_QUERY = gql`
  query CURRENT_DOSEN_QUERY($id: ID!) {
    dosen(id: $id) {
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
      user {
        id
        email
      }
      kelases {
        id
        nama
        prodi {
          id
          nama
          jurusan {
            id
            nama
          }
        }
        mataKuliah {
          id
          nama
        }
      }
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

const ProfilAdmin = ({ id }) => (
  <Query query={CURRENT_DOSEN_QUERY} variables={{ id }} fetchPolicy="network-only">
    {({ data, loading }) => {
      console.log(data, 'data profil');
      if (loading) return <p>Loading...</p>;

      return (
        <Row type="flex" gutter={16} style={{ margin: '40px' }}>
          <Col xs={24} md={8}>
            <Card title="Informasi Akun Dosen" loading={loading}>
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
                    title={<a>Nama Dosen</a>}
                    description={data.dosen.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="info" />}
                    title={<a>NIP</a>}
                    description={data.dosen.nip}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="deployment-unit" />}
                    title={<a>Jurusan</a>}
                    description={data.dosen.prodi.jurusan.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="cluster" />}
                    title={<a>Program Studi</a>}
                    description={data.dosen.prodi.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="mail" />}
                    title={<a>Email</a>}
                    description={data.dosen.user.email}
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
            <Card title="Kelas yang diajar">
              <ListKelas kelases={data.dosen.kelases} loading={loading} idDosen={data.dosen.id} />
            </Card>
          </Col>
        </Row>
      );
    }}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_DOSEN_QUERY };
