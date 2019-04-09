import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';

import ListKelas from '../../dosen/ujian/ListKelas';

import moment from 'moment';
import 'moment/locale/id';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    ujian(where: { id: $id }) {
      id
      nama

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
      kelas {
        id
        nama
        mataKuliah {
          id
          nama
        }
      }

      tanggalPelaksanaan
      lokasi
      JumlahSoal
      durasiPengerjaan
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
            <Row type="flex" gutter={16} style={{ margin: '40px' }} justify="center">
              <Col xs={24} md={24}>
                <Card
                  title={<span style={{ textAlign: 'center' }}>Informasi Ujian</span>}
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

                  <List grid={{ gutter: 16, column: 4 }}>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" />}
                        title={<a>Nama Ujian</a>}
                        description={data.ujian.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="schedule" />}
                        title={<a>Tanggal Pelaksanaan</a>}
                        description={moment(data.ujian.tanggalPelaksanaan).format('dddd, Do MMMM  YYYY')}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="schedule" />}
                        title={<a>Jam</a>}
                        description={moment(data.ujian.tanggalPelaksanaan).format('hh:mm:ss a')}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" />}
                        title={<a>Durasi Ujian</a>}
                        description={`${data.ujian.durasiPengerjaan} menit`}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" />}
                        title={<a>Lokasi Ujian</a>}
                        description={`${data.ujian.lokasi}`}
                      />
                    </List.Item>
                    {/* <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="info" />}
                          title={<a> Mata Kuliah</a>}
                          description={data.ujian.mataKuliah ? data.ujian.mataKuliah.nama : '-'}
                        />
                      </List.Item> */}

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="deployment-unit" />}
                        title={<a>Jurusan</a>}
                        description={data.ujian.prodi.jurusan.nama}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="cluster" />}
                        title={<a>Program Studi</a>}
                        description={data.ujian.prodi.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="user" />}
                        title={<a>Dosen</a>}
                        description={data.ujian.dosen ? data.ujian.dosen.nama : '-'}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="bank" />}
                        title={<a>Kelas</a>}
                        description={`${data.ujian.kelas.nama} - ${
                          data.ujian.kelas.mataKuliah.nama
                        }`}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" />}
                        title={<a>Jumlah Soal</a>}
                        description={data.ujian.JumlahSoal}
                      />
                    </List.Item>
                  </List>
                </Card>

                <Card style={{ marginTop: '20px' }}>
                  <p>Count Down Waktu Pelaksanaan Ujian</p>
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
