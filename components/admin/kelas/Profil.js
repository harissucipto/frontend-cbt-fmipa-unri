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
            <Card style={{ margin: '30px' }} title="Kelola Mata Kuliah">
              <Row>
                <Col span={8}>
                  <Card
                    title="Informasi Mata Kuliah"
                    style={{ margin: '20px', padding: '24px' }}
                    loading={loading}
                    extra={
                      <>
                        <Button type="primary" onClick={() => Router.push('/admin/dosen/edit')}>
                          Edit
                        </Button>
                        {/* <Button type="primary" onClick={() => Router.push('/admin/dosen/tambah')}>
                      Hapus
                    </Button> */}
                      </>
                    }
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
                          description={data.kelas.nama}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a href="https://ant.design"> Mata Kuliah</a>}
                          description={data.kelas.mataKuliah ? data.kelas.mataKuliah.nama : '-'}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a href="https://ant.design">Jurusan</a>}
                          description={data.kelas.prodi.jurusan.nama}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a href="https://ant.design">Prodi</a>}
                          description={data.kelas.prodi.nama}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a href="https://ant.design">Dosen</a>}
                          description={data.kelas.dosen ? data.kelas.dosen.nama : '-'}
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
                    title="Mahasiswa yang mengambil: "
                    style={{ margin: '20px', padding: '20px' }}
                    extra={
                      <Button
                        onClick={() =>
                          Router.push(`/admin/kelas/tambah-mahasiswa?kelas=${data.kelas.id}`)
                        }
                      >
                        Tambah
                      </Button>
                    }
                  >
                    <ListKelas
                      mahasiswas={data.kelas.mahasiswas}
                      loading={loading}
                      kelas={data.kelas.id}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default ProfilAdmin;
export { CURRENT_QUERY };
