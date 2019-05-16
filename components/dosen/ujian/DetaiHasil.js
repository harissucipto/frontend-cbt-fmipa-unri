import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Card, List, Avatar, Row, Col, Button, Table, Popover, Tag } from 'antd';
import { Editor } from 'react-draft-wysiwyg';

import ListKelas from './ListKelas';
import ProfilUjian from './ProfilUjianHasil';

const CURRENT_QUERY = gql`
  query CURRENT_QUERY($id: ID!, $mahasiswa: ID!) {
    getInfosoalMahasiswa(
      where: { AND: [{ mahasiswa: { id: $mahasiswa } }, { ujian: { id: $id } }] }
    ) {
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
  state = {
    indexSoal: undefined,
    noSoal: undefined,
    display: true,
  };

  render() {
    const { id } = this.props;

    return (
      <Query
        query={CURRENT_QUERY}
        variables={{ id, mahasiswa: this.props.mahasiswa }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error }) => {
          console.log(id, 'ini props id ujian');
          if (loading) return <p>Loading...</p>;
          console.log(error);

          const {
 ujian, skor, mahasiswa, jawaban, urutan,
} = data.getInfosoalMahasiswa[0];

          const { soals } = ujian;
          const detailSoal = soals.find(item => item.id === this.state.indexSoal);
          const temukanNomorSoalAsli = identitas =>
            soals.findIndex(soal => soal.id === identitas) + 1;
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

                {detailSoal && (
                  <Card
                    style={{
                      border: '1px solid black',
                      marginBottom: '10px',
                    }}
                    title="Detail Soal"
                  >
                    <div
                      style={{
                        overflow: 'auto',
                        background: 'ivory',
                        height: '30rem',
                      }}
                    >
                      <Row gutter={40}>
                        <Col span={1}>{this.state.noSoal}</Col>
                        <Col span={18}>
                          {' '}
                          {detailSoal.image && (
                            <img src={detailSoal.image} width={200} alt="gambar soal" />
                          )}
                          {this.state.display && (
                            <>
                              <div
                                className="readonly-editor"
                                style={{
                                  marginBottom: '10px',
                                  padding: '5px',
                                }}
                              >
                                <Editor
                                  toolbarHidden
                                  readOnly
                                  contentState={JSON.parse(detailSoal.pertanyaan)}
                                />
                              </div>

                              <div style={{ marginLeft: '20px' }}>
                                {detailSoal.jawaban.map(jawaban => (
                                  <Row key={jawaban.id}>
                                    <Col span={1}>
                                      <h4>{jawaban.title}.</h4>
                                    </Col>
                                    <Col span={18}>
                                      <div className="readonly-editor">
                                        <div>
                                          {jawaban.image && (
                                            <img
                                              src={jawaban.image}
                                              alt="gambar jawaban"
                                              width={200}
                                            />
                                          )}
                                        </div>

                                        <Editor
                                          toolbarHidden
                                          readOnly
                                          contentState={JSON.parse(jawaban.content)}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                ))}
                              </div>
                              <div
                                style={{
                                  marginBottom: '5px',
                                  marginTop: '10px',
                                  borderTop: '1px solid black',
                                  paddingTop: '10px',
                                }}
                              >
                                <Tag color="volcano">
                                  {' '}
                                  <h4>Kunci jawaban: {detailSoal.kunciJawaban}</h4>
                                </Tag>
                              </div>
                            </>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Card>
                )}

                <Card title="Lembar Jawaban">
                  <Table
                    pagination={false}
                    bordered
                    rowKey={record => record.id}
                    loading={loading}
                    columns={[
                      {
                        title: (
                          <div>
                            soal / kunci jawaban (sentuh nomor soal untuk melihat detail soal)
                          </div>
                        ),
                        key: 'nama',
                        render: (record, item, i) => (i < 1 ? <p>jawaban yang di pilih</p> : false),
                      },

                      ...soalDiurutkan.map((item, i) => ({
                        title: (
                          <Popover
                            content={`id soal: ${item.id}`}
                            onVisibleChange={() =>
                              this.setState({ indexSoal: item.id, noSoal: i + 1 })
                            }
                          >
                            <Button
                              type="primary"
                              style={{
                                backgroundColor:
                                  item.tingkatKesulitan === 'MUDAH'
                                    ? 'green'
                                    : item.tingkatKesulitan === 'SEDANG'
                                    ? 'orange'
                                    : 'red',
                              }}
                            >
                              {temukanNomorSoalAsli(item.id)} / {item.kunciJawaban}{' '}
                            </Button>
                          </Popover>
                        ),

                        key: item.id,
                        width: 5,
                        render: (text, record, index) => {
                          console.log(item, 'ini item');
                          const jawabanKu = jawaban.find(test => test.idSoal === item.id);
                          const benarTidak = jawabanKu
                            ? jawabanKu.jawaban.title === item.kunciJawaban
                            : false;

                          return index > 0 ? (
                            false
                          ) : (
                            <div
                              style={{
                                textAlign: 'center',
                                color: 'white',
                                backgroundColor: benarTidak ? 'skyblue' : 'silver',
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
