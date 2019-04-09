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
        skor
        ujian {
          id
        }
        soals {
          id
          image
          kunciJawaban
          pertanyaan
          tingkatKesulitan
          jawaban {
            id
            image
            title
            image
            content
          }
        }
        jawaban {
          idSoal
          id
          jawaban {
            id
            title
          }
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
  state = {
    indexSoal: undefined,
    noSoal: undefined,
    display: true,
  };

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

          const detailSoal = ujian.soalMahasiswas[0].soals.find(item => item.id === this.state.indexSoal);

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
                  <h1>{ujian.soalMahasiswas.find(item => item.ujian.id === ujian.id).skor}</h1>
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
                        render: () => <p>jawaban yang di pilih</p>,
                      },

                      ...ujian.soalMahasiswas[0].soals.map((item, i) => ({
                        title: (
                          <Popover
                            content={`id soal: ${item.id}`}
                            onVisibleChange={() =>
                              this.setState({ indexSoal: item.id, noSoal: i + 1 })
                            }
                          >
                            <Button type="dashed">
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
