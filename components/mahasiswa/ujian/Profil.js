import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button } from 'antd';

import ListKelas from './ListKelas';

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
        mahasiswas {
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
            <Card style={{ margin: '30px' }}>
              <Row>
                <Col span={8}>
                  <Card
                    title="Informasi Ujian"
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
                          title={<a>Nama Ujian</a>}
                          description={data.ujian.nama}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Waktu Pelaksanaan</a>}
                          description={data.ujian.tanggalPelaksanaan}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Durasi Ujian</a>}
                          description={`${data.ujian.durasiPengerjaan} menit`}
                        />
                      </List.Item>
                      {/* <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a> Mata Kuliah</a>}
                          description={data.ujian.mataKuliah ? data.ujian.mataKuliah.nama : '-'}
                        />
                      </List.Item> */}

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Jurusan</a>}
                          description={data.ujian.prodi.jurusan.nama}
                        />
                      </List.Item>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Prodi</a>}
                          description={data.ujian.prodi.nama}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Dosen</a>}
                          description={data.ujian.dosen ? data.ujian.dosen.nama : '-'}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Kelas</a>}
                          description={`${data.ujian.kelas.nama} - ${
                            data.ujian.kelas.mataKuliah.nama
                          }`}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Bank Soal</a>}
                          description={data.ujian.bankSoal.nama}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Jumlah Soal</a>}
                          description={data.ujian.JumlahSoal}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Tingkat Kesulitan Soal Susah</a>}
                          description={`${data.ujian.presentasiSusah}%`}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Tingkat Kesulitan Soal Sedang</a>}
                          description={`${data.ujian.presentasiSedang}%`}
                        />
                      </List.Item>

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="mail" />}
                          title={<a>Tingkat Kesulitan Soal Mudah</a>}
                          description={`${data.ujian.presentasiMudah}%`}
                        />
                      </List.Item>
                    </List>
                  </Card>
                </Col>
                <Col span={16}>
                  <Card title="Peserta Ujian: " style={{ margin: '20px', padding: '20px' }}>
                    <ListKelas
                      mahasiswas={data.ujian.kelas.mahasiswas}
                      loading={loading}
                      kelas={data.ujian.kelas.id}
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
