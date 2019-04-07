import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button, Table, Popover } from 'antd';

import ListKelas from '../../dosen/ujian/ListKelas';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!) {
    ujiansMahasiswa(where: { AND: [{ id: $id }] }) {
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
      soalMahasiswas {
        id
        ujian {
          id
        }
        soals {
          id
          kunciJawaban
        }
        jawaban {
          idSoal
          id
          jawaban {
            id
            title
          }
        }
        skor {
          id
          nilai
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

          const [ujian] = data.ujiansMahasiswa;

          return (
            <Row type="flex" gutter={16} style={{ margin: '40px' }} justify="center">
              <Col xs={24} md={24}>
                <Card
                  title={<span style={{ textAlign: 'center' }}>Informasi Hasil Ujian</span>}
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
                        description={ujian.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="schedule" />}
                        title={<a>Waktu Pelaksanaan</a>}
                        description={ujian.tanggalPelaksanaan}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" />}
                        title={<a>Durasi Ujian</a>}
                        description={`${ujian.durasiPengerjaan} menit`}
                      />
                    </List.Item>
                    {/* <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="info" />}
                          title={<a> Mata Kuliah</a>}
                          description={ujian.mataKuliah ? ujian.mataKuliah.nama : '-'}
                        />
                      </List.Item> */}

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="deployment-unit" />}
                        title={<a>Jurusan</a>}
                        description={ujian.prodi.jurusan.nama}
                      />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="cluster" />}
                        title={<a>Program Studi</a>}
                        description={ujian.prodi.nama}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="user" />}
                        title={<a>Dosen</a>}
                        description={ujian.dosen ? ujian.dosen.nama : '-'}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="bank" />}
                        title={<a>Kelas</a>}
                        description={`${ujian.kelas.nama} - ${ujian.kelas.mataKuliah.nama}`}
                      />
                    </List.Item>

                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon="info" />}
                        title={<a>Jumlah Soal</a>}
                        description={ujian.JumlahSoal}
                      />
                    </List.Item>
                  </List>
                </Card>
                <Card style={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                  <h4>Nilai Ujian Kamu</h4>
                  <h1>
                    {ujian.soalMahasiswas.find(item => item.ujian.id === ujian.id).skor.nilai}
                  </h1>
                </Card>
                <Card>
                  <h3>Lembar Jawabanmu</h3>
                  <Table
                    pagination={false}
                    bordered
                    rowKey={record => record.id}
                    loading={loading}
                    columns={[
                      {
                        title: 'soal / kunci jawaban',
                        key: 'nama',
                        render: (text, record, id) => (id === 0 ? 'jawaban' : 'jawabanmu'),
                      },

                      ...ujian.soalMahasiswas[0].soals.map((item, i) => ({
                        title: (
                          <Popover content={`id soal: ${item.id}`}>
                            <Button>
                              {i + 1} / {item.kunciJawaban}{' '}
                            </Button>
                          </Popover>
                        ),

                        key: item.id,
                        width: 5,
                        render: (text, record) => {
                          console.log(item, 'ini item');
                          const jawabanKu = record.jawaban.find(jawab => jawab.idSoal === item.id);
                          return (
                            <div
                              style={{
                                textAlign: 'center',
                                color: 'white',
                                backgroundColor: !jawabanKu
                                  ? 'red'
                                  : item.kunciJawaban === jawabanKu.jawaban.title
                                  ? 'blue'
                                  : 'red',
                              }}
                            >
                              <p>{jawabanKu ? jawabanKu.jawaban.title : ''}</p>
                            </div>
                          );
                        },
                      })),
                    ]}
                    dataSource={ujian.soalMahasiswas}
                    scroll={{ x: 1300 }}
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
