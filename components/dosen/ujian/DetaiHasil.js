import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button, Table, Popover } from 'antd';

import ListKelas from './ListKelas';
import ProfilUjian from './ProfilUjianHasil';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!, $mahasiswa: ID!) {
    ujians(where: { AND: [{ id: $id }, { kelas: { mahasiswas_some: { id: $mahasiswa } } }] }) {
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
        mahasiswas {
          id
          nama
          image
          nim
        }
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
    const { id, mahasiswa } = this.props;
    console.log(id, mahasiswa);

    return (
      <Query query={CURRENT_QUERY} variables={{ id, mahasiswa }} fetchPolicy="network-only">
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          console.log(error);
          if (error) return <p>anda tidak boleh curang</p>;
          if (!data) return <p>Loading..</p>;
          console.log(data, 'data profil');

          const [ujian] = data.ujians;
          const [mahasiswa] = ujian.kelas.mahasiswas;

          return (
            <Row type="flex" gutter={16} style={{ margin: '40px' }} justify="center">
              <Col xs={24} md={24}>
                <Card title="Profil Ujian">
                  <ProfilUjian
                    mahasiswa={mahasiswa}
                    ujian={ujian}
                    grid={{
                      gutter: 16,
                      lg: 3,
                      md: 2,
                      xs: 1,
                    }}
                  />
                </Card>

                <Card style={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                  <h4>Nilai Ujian yang didapat</h4>
                  <h1>
                    {ujian.soalMahasiswas.find(item => item.ujian.id === ujian.id).skor.nilai}
                  </h1>
                </Card>
                <Card>
                  <h3>Lembar Jawaban</h3>
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
