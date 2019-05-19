/* eslint-disable react/prop-types */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Row, Col, Button, Table, Popover, Tag } from 'antd';

import ProfilUjian from '../../dosen/ujian/ProfilUjianHasil';
import { Editor } from 'react-draft-wysiwyg';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($idUjian: ID!) {
    infosoalMahasiswa(idUjian: $idUjian) {
      id
      skor
      urutan
      ujian {
        soals {
          id
          image
          pertanyaan
          jawaban {
            id
            image
            title
            content
          }
          kunciJawaban
        }
        id
        nama
        tanggalPelaksanaan
        lokasi

        durasiPengerjaan
        dosen {
          id
          nama
        }
        kelas {
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
      jawaban {
        id
        idSoal
        jawaban {
          id
          title
        }
      }
      mahasiswa {
        id
        nama
        image
        nim
      }
    }
  }
`;

class ProfilAdmin extends React.Component {
  render() {
    const { id } = this.props;

    return (
      <Query query={CURRENT_QUERY} variables={{ idUjian: id }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data) return <p>Loading..</p>;

          const {
 ujian, skor, mahasiswa, urutan, jawaban,
} = data.infosoalMahasiswa[0];

          const { soals } = ujian;

          const soalDiurutkan = urutan.split(',').map((nomor) => {
            const index = Number(nomor) - 1;
            return soals[index];
          });

          const benar = jawaban.reduce((acc, lembarJawaban) => {
            const { title } = lembarJawaban.jawaban;
            const nilai =
              soals.find(soal => soal.id === lembarJawaban.idSoal).kunciJawaban === title ? 1 : 0;

            return acc + nilai;
          }, 0);

          return (
            <Row type="flex" gutter={16} style={{ margin: '40px' }} justify="center">
              <Col xs={24} md={24}>
                <Card title="Profil Ujian">
                  <ProfilUjian
                    mahasiswa={mahasiswa}
                    ujian={ujian}
                    benar={benar}
                    salah={soals.length - benar}
                    grid={{
                      gutter: 16,
                      lg: 3,
                      md: 2,
                      xs: 1,
                    }}
                  />
                </Card>

                <Card
                  style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    color: 'blue',
                  }}
                >
                  <h4>Nilai Ujian yang didapat</h4>
                  <h1>{skor}</h1>
                </Card>

                <Card title="Lembar Jawaban">
                  <Table
                    pagination={false}
                    bordered
                    rowKey={record => record.id}
                    loading={loading}
                    columns={[
                      {
                        title: <div>Nomor Soal</div>,
                        key: 'nama',
                        render: (record, item, i) => (i < 1 ? <p>jawaban yang di pilih</p> : false),
                      },

                      ...soalDiurutkan.map((item, i) => ({
                        title: <Button type="dashed">{i + 1}</Button>,

                        key: item.id,
                        width: 5,
                        render: (text, record, index) => {
                          console.log(item, 'ini item');
                          const jawabanKu = jawaban.find(test => test.idSoal === item.id);
                          const benarTidak = jawabanKu
                            ? jawabanKu.jawaban.title === item.kunciJawaban
                            : false;
                          console.log(jawabanKu, 'iiii');
                          return index > 0 ? (
                            false
                          ) : (
                            <div
                              style={{
                                textAlign: 'center',
                                color: 'white',
                                backgroundColor: benarTidak ? 'green' : 'red',
                              }}
                            >
                              <p>{jawabanKu ? jawabanKu.jawaban.title : ''}</p>
                            </div>
                          );
                        },
                      })),
                    ]}
                    dataSource={[soals]}
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
