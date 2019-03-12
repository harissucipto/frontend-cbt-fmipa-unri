import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar, Row, Col } from 'antd';

import ListKelas from './ListKelas';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    mataKuliah(id: $id) {
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
        dosen {
          id
          nama
          nip
        }
      }
    }
  }
`;

const ProfilAdmin = ({ id }) => (
  <Query query={CURRENT_QUERY} variables={{ id }}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data) return <p>Loading..</p>;
      console.log(data, 'data profil');

      return (
        <Card style={{ margin: '30px' }} title="Kelola Mata Kuliah">
          <Row>
            <Col span={8}>
              <Card
                title="Informasi Mata Kuliah"
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
                      title={<a href="https://ant.design">Nama</a>}
                      description={data.mataKuliah.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Kode Mata Kuliah</a>}
                      description={data.mataKuliah.kode}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Jurusan</a>}
                      description={data.mataKuliah.prodi.jurusan.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Prodi</a>}
                      description={data.mataKuliah.prodi.nama}
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
            <Col span={16}>
              <Card
                title="Kelas yang berkaitan dengan mata kuliah"
                style={{ margin: '20px', padding: '20px' }}
              >
                <ListKelas
                  kelases={data.mataKuliah.kelases}
                  loading={loading}
                  idDosen={data.mataKuliah.id}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      );
    }}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_QUERY };
