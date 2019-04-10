/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
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
  <Query query={CURRENT_QUERY} variables={{ id }} fetchPolicy="network-only">
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data) return <p>Loading..</p>;
      console.log(data, 'data profil');

      return (
        <Row type="flex" gutter={16} style={{ margin: '40px' }}>
          <Col xs={24} md={8}>
            <Card title="Informasi Mata Kuliah" loading={loading}>
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
                    avatar={<Avatar icon="user" style={{ backgroundColor: 'maroon' }} />}
                    title={<a>Nama</a>}
                    description={data.mataKuliah.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="info" style={{ backgroundColor: 'navy' }} />}
                    title={<a>Kode Mata Kuliah</a>}
                    description={data.mataKuliah.kode}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="deployment-unit" style={{ backgroundColor: 'brown' }} />}
                    title={<a>Jurusan</a>}
                    description={data.mataKuliah.prodi.jurusan.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="cluster" style={{ backgroundColor: 'olive' }} />}
                    title={<a>Program Studi</a>}
                    description={data.mataKuliah.prodi.nama}
                  />
                </List.Item>
                {/* <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title={<a>Email</a>}
                description={data.admin.email}
              />
            </List.Item> */}
              </List>
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card title="Kelas yang berkaitan dengan mata kuliah">
              <ListKelas
                kelases={data.mataKuliah.kelases}
                loading={loading}
                idDosen={data.mataKuliah.id}
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
