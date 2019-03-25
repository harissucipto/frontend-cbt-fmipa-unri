import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';

import ListKelas from './ListKelas';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    kelas(id: $id) {
      id
      nama
      mataKuliah {
        id
        nama
      }
      dosen {
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
      mahasiswas {
        id
        nama
        nim
      }
    }
  }
`;

class ProfilAdmin extends React.Component {
  render() {
    const { id } = this.props;

    return (
      <Query query={CURRENT_QUERY} variables={{ id }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data) return <p>Loading..</p>;
          console.log(data, 'data profil');

          return (
            <Row type="flex" gutter={16} style={{ margin: '40px' }}>
              <Col xs={24} md={8}>
                <Card title="Informasi Kelas" loading={loading}>
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
                        avatar={<Avatar icon="bank" />}
                        title="Nama Kelas"
                        description={data.kelas.nama}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="mail" />}
                        title=" Mata Kuliah"
                        description={data.kelas.mataKuliah ? data.kelas.mataKuliah.nama : '-'}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="deployment-unit" />}
                        title="Jurusan"
                        description={data.kelas.prodi.jurusan.nama}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="cluster" />}
                        title="Program Studi"
                        description={data.kelas.prodi.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="user" />}
                        title="Dosen"
                        description={data.kelas.dosen ? data.kelas.dosen.nama : '-'}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" />}
                        title="Jumlah Mahasiswa"
                        description={data.kelas.mahasiswas.length}
                      />
                    </List.Item>
                    {/* <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title="Email</a>}
                description={data.admin.email}
              />
            </List.Item> */}
                  </List>
                </Card>
              </Col>
              <Col xs={24} md={16}>
                <Card title="Mahasiswa yang mengambil: ">
                  <ListKelas
                    mahasiswas={data.kelas.mahasiswas}
                    loading={loading}
                    kelas={data.kelas.id}
                  />
                </Card>
              </Col>
            </Row>
          );
        }}
      </Query>
    );
  }
}

export default ProfilAdmin;
export { CURRENT_QUERY };
