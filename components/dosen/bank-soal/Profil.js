import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar, Row, Col } from 'antd';

// import ListKelas from './ListKelas';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    bankSoal(where: { id: $id }) {
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
      dosen {
        id
        nama
      }
    }
  }
`;

const ProfilAdmin = ({ id }) => (
  <Query query={CURRENT_QUERY} variables={{ id }} fetchPolicy="network-only">
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data) return <p>Loading..</p>;
      console.log(data, 'data profil');

      return (
        <Card style={{ margin: '30px' }} title="Kelola Bank Soal">
          <Row>
            <Col span={8}>
              <Card
                title="Informasi Bank Soal"
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
                      title={<a href="https://ant.design">Nama Bank Soal</a>}
                      description={data.bankSoal.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design"> Mata Kuliah</a>}
                      description={data.bankSoal.mataKuliah.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Jurusan</a>}
                      description={data.bankSoal.prodi.jurusan.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Prodi</a>}
                      description={data.bankSoal.prodi.nama}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="mail" />}
                      title={<a href="https://ant.design">Dosen</a>}
                      description={data.bankSoal.dosen.nama}
                    />
                  </List.Item>
                </List>
              </Card>
            </Col>
            <Col span={16}>
              <Card
                title="Kelas yang berkaitan dengan mata kuliah"
                style={{ margin: '20px', padding: '20px' }}
              >
                {/* <ListKelas
                  kelases={data.bankSoal.kelases}
                  loading={loading}
                  idDosen={data.bankSoal.id}
                /> */}
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
