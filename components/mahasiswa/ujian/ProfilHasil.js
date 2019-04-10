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
        tingkatKesulitan
      }
      ujian {
        id
        nama
        tanggalPelaksanaan
        lokasi
        JumlahSoal
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
      <Query query={CURRENT_QUERY} variables={{ idUjian: id }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data) return <p>Loading..</p>;


          const {
 ujian, soals, skor, mahasiswa, jawaban,
} = data.infosoalMahasiswa[0];

          const detailSoal = soals.find(item => item.id === this.state.indexSoal);

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
                                <Tag
                                  color={
                                    detailSoal.tingkatKesulitan === 'MUDAH'
                                      ? 'green'
                                      : detailSoal.tingkatKesulitan === 'SEDANG'
                                      ? 'orange'
                                      : 'red'
                                  }
                                >
                                  {' '}
                                  <h4>Tingkat Kesulitan : {detailSoal.tingkatKesulitan}</h4>
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

                      ...soals.map((item, i) => ({
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
                              {i + 1} / {item.kunciJawaban}{' '}
                            </Button>
                          </Popover>
                        ),

                        key: item.id,
                        width: 5,
                        render: (text, record, index) => {
                          console.log(item, 'ini item');
                          const jawabanKu = jawaban.find(test => test.idSoal === item.id);
                          const benarTidak =
                            jawaban.findIndex(test => test.jawaban.title === item.kunciJawaban) >=
                            0;
                          console.log(jawabanKu, 'iiii');
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
