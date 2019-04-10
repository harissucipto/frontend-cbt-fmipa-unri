import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';

import ListSoal from './ListSoal';

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
      soals {
        id
        image
        pertanyaan
        jawaban {
          image
          id
          title
          content
        }
        kunciJawaban
        tingkatKesulitan
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
          <Col xs={24} md={24}>
            <Card title="Informasi Bank Soal" loading={loading} style={{ marginBottom: '20px' }}>
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

              <List
                grid={{
                  gutter: 16,
                  lg: 3,
                  md: 2,
                  xs: 1,
                }}
              >
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="file-text" style={{ backgroundColor: 'maroon' }} />}
                    title={<a>Nama Bank Soal</a>}
                    description={data.bankSoal.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="mail" style={{ backgroundColor: 'brown' }} />}
                    title={<a> Mata Kuliah</a>}
                    description={data.bankSoal.mataKuliah.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="info" style={{ backgroundColor: 'olive' }} />}
                    title={<a>Jumlah Soal</a>}
                    description={data.bankSoal.soals.length}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="setting" style={{ backgroundColor: 'blue' }} />}
                    title={<a>Jumlah soal tingkat kesulitan mudah</a>}
                    description={
                      !data.bankSoal.soals.length
                        ? '0 Soal'
                        : `${
                            data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'MUDAH')
                              .length
                          } Soal`
                    }
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="setting" style={{ backgroundColor: 'orange' }} />}
                    title={<a>Jumlah soal tingkat kesulitan sedang</a>}
                    description={
                      !data.bankSoal.soals.length
                        ? 0
                        : `${
                            data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'SEDANG')
                              .length
                          } soal`
                    }
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="setting" style={{ backgroundColor: 'red' }} />}
                    title={<a>Jumlah soal tingkat kesulitan susah</a>}
                    description={
                      !data.bankSoal.soals.length
                        ? 0
                        : `${
                            data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'SUSAH')
                              .length
                          } soal`
                    }
                  />
                </List.Item>

                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="deployment-unit" style={{ backgroundColor: 'navy' }} />}
                    title={<a>Jurusan</a>}
                    description={data.bankSoal.prodi.jurusan.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="cluster" style={{ backgroundColor: 'black' }} />}
                    title={<a>Prodi</a>}
                    description={data.bankSoal.prodi.nama}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon="user" style={{ backgroundColor: 'lime' }} />}
                    title={<a>Dosen</a>}
                    description={data.bankSoal.dosen.nama}
                  />
                </List.Item>
              </List>
            </Card>
          </Col>
          <Col xs={24} md={24}>
            <Card
              title="Soal Yang Telah Dibuat"
              extra={
                <Button
                  type="primary"
                  onClick={() => Router.push(`/dosen/bank-soal/tambah-soal?id=${data.bankSoal.id}`)}
                >
                  Tambah Soal
                </Button>
              }
            >
              <ListSoal
                soals={data.bankSoal.soals}
                bankSoal={data.bankSoal.id}
                loading={loading}
                idDosen={data.bankSoal.id}
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
