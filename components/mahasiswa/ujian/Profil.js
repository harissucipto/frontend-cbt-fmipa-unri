import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';
import CountDown from 'react-countdown-now';

import ListKelas from '../../dosen/ujian/ListKelas';

import moment from 'moment-timezone';
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
      soals {
        id
      }
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
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'maroon' }} />}
                        title={<a>Nama Ujian</a>}
                        description={data.ujian.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="schedule" style={{ backgroundColor: 'brown' }} />}
                        title={<a>Tanggal Pelaksanaan</a>}
                        description={moment(data.ujian.tanggalPelaksanaan).format('dddd, Do MMMM  YYYY')}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="schedule" style={{ backgroundColor: 'olive' }} />}
                        title={<a>Jam</a>}
                        description={moment(data.ujian.tanggalPelaksanaan).format('hh:mm:ss a')}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'teal' }} />}
                        title={<a>Durasi Ujian</a>}
                        description={`${data.ujian.durasiPengerjaan} menit`}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'navy' }} />}
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
                        avatar={
                          <Avatar icon="deployment-unit" style={{ backgroundColor: 'black' }} />
                        }
                        title={<a>Jurusan</a>}
                        description={data.ujian.prodi.jurusan.nama}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="cluster" style={{ backgroundColor: 'lime' }} />}
                        title={<a>Program Studi</a>}
                        description={data.ujian.prodi.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="user" style={{ backgroundColor: 'purple' }} />}
                        title={<a>Dosen</a>}
                        description={data.ujian.dosen ? data.ujian.dosen.nama : '-'}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="bank" style={{ backgroundColor: '#324' }} />}
                        title={<a>Kelas</a>}
                        description={`${data.ujian.kelas.nama} - ${
                          data.ujian.kelas.mataKuliah.nama
                        }`}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" style={{ backgroundColor: '#643' }} />}
                        title={<a>Jumlah Soal</a>}
                        description={data.ujian.soals.length}
                      />
                    </List.Item>
                  </List>
                </Card>

                <Card
                  style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    padding: '2rem 0',
                    fontSize: '1.5rem',
                    color: 'navy',
                  }}
                >
                  <p>Count Down Waktu Pelaksanaan Ujian</p>
                  <CountDown date={moment(data.ujian.tanggalPelaksanaan)} />
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
