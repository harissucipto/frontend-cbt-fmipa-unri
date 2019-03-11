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
          nama
        }
      }
      mataKuliahs {
        id
        nama
        kode
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
  <Query query={CURRENT_DOSEN_QUERY} variables={{ id }}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data) return <p>Loading..</p>;
      console.log(data, 'data profil');

      return (
        <Card style={{ margin: '30px' }} title="Kelola Akun Dosen">
          <Row>
            <Col span={12}>
              <Card
                title="Informasi Akun Dosen"
                style={{ margin: '20px', padding: '24px' }}
                loading={loading}
              >
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
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Email</a>}
                      description={data.dosen.user.email}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Nama</a>}
                      description={data.dosen.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">NIP</a>}
                      description={data.dosen.nip}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Jurusan</a>}
                      description={data.dosen.prodi.jurusan.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Prodi</a>}
                      description={data.dosen.prodi.nama}
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
            <Col span={12}>
              <Card title="Mata Kuliah  yang diajar" style={{ margin: '20px', padding: '20px' }}>
                <ListMataKuliah mataKuliahs={data.dosen.mataKuliahs} loading={loading} />
              </Card>

              <Card title="Kelas yang diajar" style={{ margin: '20px', padding: '20px' }}>
                <ListKelas kelases={data.dosen.kelases} loading={loading} idDosen={data.dosen.id} />
              </Card>
            </Col>
          </Row>
        </Card>
      );
    }}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_DOSEN_QUERY };
