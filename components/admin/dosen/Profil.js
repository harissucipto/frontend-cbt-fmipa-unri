/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, List, Avatar, Row, Col } from 'antd';

import ListKelas from './ListKelas';

const CURRENT_DOSEN_QUERY = gql`
  query CURRENT_DOSEN_QUERY($id: ID!) {
    dosen(id: $id) {
      id
      nama
      nip
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

const ProfilAdmin = ({ id }) => (
  <Query query={CURRENT_DOSEN_QUERY} variables={{ id }} fetchPolicy="network-only">
    {({ data, loading }) => (
      /* console.log(data, 'data profil'); */

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

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={data.dosen.image} size={200} style={{ backgroundColor: 'maroon' }} />
            </div>

            <List>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="user" style={{ backgroundColor: 'brown' }} />}
                  title={<a>Nama Dosen</a>}
                  description={data.dosen.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="info" style={{ backgroundColor: 'olive' }} />}
                  title={<a>NIP</a>}
                  description={data.dosen.nip}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="deployment-unit" style={{ backgroundColor: 'teal' }} />}
                  title={<a>Jurusan</a>}
                  description={data.dosen.prodi.jurusan.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="cluster" style={{ backgroundColor: 'navy' }} />}
                  title={<a>Program Studi</a>}
                  description={data.dosen.prodi.nama}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="mail" style={{ backgroundColor: 'black' }} />}
                  title={<a>Email</a>}
                  description={data.dosen.user.email}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon="key" style={{ backgroundColor: 'lime' }} />}
                  title={<a>Password Akun</a>}
                  description={data.dosen.user.passwordKasih}
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
    )}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_DOSEN_QUERY };
