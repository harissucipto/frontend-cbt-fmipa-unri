import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';
import CountDown from 'react-countdown-now';

import moment from 'moment-timezone';
import 'moment/locale/id';

import ListKelas from './ListKelas';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    ujian(where: { id: $id }) {
      id
      nama
      pin
      pinPengawas
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
        mahasiswas {
          image
          id
          nama
          nim
        }
      }
      bankSoal {
        id
        nama
      }
      tanggalPelaksanaan
      lokasi
      JumlahSoal
      presentasiSusah
      presentasiSedang
      presentasiMudah
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
            <Row type="flex" gutter={16} style={{ margin: '40px' }}>
              <Col xs={24} md={10}>
                <Card
                  title="Informasi Ujian"
                  loading={loading}
                  extra={
                    <Button
                      type="primary"
                      onClick={() =>
                        Router.push({
                          pathname: '/dosen/ujian/soals',
                          query: { id: data.ujian.id },
                        })
                      }
                    >
                      Lihat Distribusi Soal
                    </Button>
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
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'maroon' }} />}
                        title={<a>Nama Ujian</a>}
                        description={data.ujian.nama}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'brown' }} />}
                        title={<a>Pin Ujian</a>}
                        description={data.ujian.pin}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'olive' }} />}
                        title={<a>Pin Pengawas</a>}
                        description={data.ujian.pinPengawas}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="schedule" style={{ backgroundColor: 'teal' }} />}
                        title={<a>Tanggal Pelaksanaan</a>}
                        description={moment(data.ujian.tanggalPelaksanaan).format('dddd, Do MMMM  YYYY')}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="schedule" style={{ backgroundColor: 'navy' }} />}
                        title={<a>Jam</a>}
                        description={moment(data.ujian.tanggalPelaksanaan).format('hh:mm:ss a')}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'black' }} />}
                        title={<a>Durasi Ujian</a>}
                        description={`${data.ujian.durasiPengerjaan} menit`}
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
                          <Avatar icon="deployment-unit" style={{ backgroundColor: 'lime' }} />
                        }
                        title={<a>Jurusan</a>}
                        description={data.ujian.prodi.jurusan.nama}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="cluster" style={{ backgroundColor: 'cyan' }} />}
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
                        avatar={<Avatar icon="bank" style={{ backgroundColor: 'magenta' }} />}
                        title={<a>Kelas</a>}
                        description={`${data.ujian.kelas.nama} - ${
                          data.ujian.kelas.mataKuliah.nama
                        }`}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="file" style={{ backgroundColor: 'lavender' }} />}
                        title={<a>Bank Soal</a>}
                        description={data.ujian.bankSoal.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" style={{ backgroundColor: 'pink' }} />}
                        title={<a>Jumlah Soal</a>}
                        description={data.ujian.JumlahSoal}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="setting" style={{ backgroundColor: 'red' }} />}
                        title={<a>Tingkat Kesulitan Soal Susah</a>}
                        description={`${data.ujian.presentasiSusah}%`}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="setting" style={{ backgroundColor: 'orange' }} />}
                        title={<a>Tingkat Kesulitan Soal Sedang</a>}
                        description={`${data.ujian.presentasiSedang}%`}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="setting" style={{ backgroundColor: 'blue' }} />}
                        title={<a>Tingkat Kesulitan Soal Mudah</a>}
                        description={`${data.ujian.presentasiMudah}%`}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="setting" style={{ backgroundColor: 'green' }} />}
                        title={<a>Tingkat Kesulitan Soal Acak</a>}
                        description={`${100 -
                          data.ujian.presentasiMudah -
                          data.ujian.presentasiSedang -
                          data.ujian.presentasiSusah}% `}
                      />
                    </List.Item>
                  </List>
                </Card>
              </Col>

              <Col xs={24} md={14}>
                <Card
                  style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    padding: '1.2rem 0',
                    fontSize: '1.2rem',
                    color: 'navy',
                    marginBottom: '20px',
                  }}
                >
                  <p style={{ color: 'grey' }}>Count Down Waktu Pelaksanaan Ujian</p>
                  <CountDown date={moment(data.ujian.tanggalPelaksanaan)} />
                </Card>
                <Card title="Peserta Ujian: ">
                  <ListKelas
                    mahasiswas={data.ujian.kelas.mahasiswas}
                    loading={loading}
                    kelas={data.ujian.kelas.id}
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
