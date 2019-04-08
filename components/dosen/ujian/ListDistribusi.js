/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Card, List, Avatar, Button, Popover, Row, Col, Tag } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { ConvertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class ListKelas extends Component {
  constructor(props) {
    super(props);

    const { soals } = this.props.bankSoal;

    this.state = {
      indexSoal: undefined,
      noSoal: undefined,
      display: true,
    };

    this.columns = [
      {
        title: 'Peserta Ujian',
        children: [
          {
            title: 'Nama',
            key: 'nama',
            render: (text, record) => <span>{record.mahasiswa.nama}</span>,
          },
          {
            title: 'NIM',
            key: 'nim',
            render: (text, record) => <span>{record.mahasiswa.nim}</span>,
          },
        ],
      },

      {
        title: (
          <p>
            Soal <br />
            <i style={{ color: 'gray' }}>Sentuh nomor soal untuk melihat</i>
          </p>
        ),
        children: [
          ...soals.map((item, i) => ({
            title: (
              <Popover
                title="Detail Soal"
                onVisibleChange={() => this.setState({ indexSoal: item.id, noSoal: i + 1 })}
                content={
                  <div>
                    <p>id Soal: {item.id}</p>
                    <p>Tingkat Kesulitan: {item.tingkatKesulitan}</p>
                  </div>
                }
              >
                <Button
                  style={{
                    backgroundColor:
                      item.tingkatKesulitan === 'SUSAH'
                        ? 'red'
                        : item.tingkatKesulitan === 'SEDANG'
                        ? 'orange'
                        : 'blue',
                  }}
                >
                  <span style={{ color: 'white' }}>{i + 1}</span>
                </Button>
              </Popover>
            ),

            key: item.id,
            width: 5,
            render: (text, record) =>
              (record.soals.find(soal => soal.id === item.id) ? (
                <Popover title="Iya">
                  <div style={{ backgroundColor: 'green', height: '10px' }} />
                </Popover>
              ) : (
                <div style={{ height: '10px' }} />
              )),
          })),
        ],
      },
    ];
  }

  render() {
    const soal = this.props.bankSoal.soals.find(soal => soal.id === this.state.indexSoal);
    console.log(soal, 'soal terpilih');
    return (
      <div>
        <Card title="Jumlah Soal" style={{ marginBottom: '15px' }}>
          <List xs={24} md={24}>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="setting" style={{ backgroundColor: 'blue' }} />}
                title={<a>Kesulitan Mudah</a>}
                description={`${
                  this.props.bankSoal.soals.filter(item => item.tingkatKesulitan === 'MUDAH').length
                } soal`}
              />
              <List.Item.Meta
                avatar={<Avatar icon="setting" style={{ backgroundColor: 'orange' }} />}
                title={<a>Kesulitan Sedang</a>}
                description={`${
                  this.props.bankSoal.soals.filter(item => item.tingkatKesulitan === 'SEDANG')
                    .length
                } soal`}
              />
              <List.Item.Meta
                avatar={<Avatar icon="setting" style={{ backgroundColor: 'red' }} />}
                title={<a>Kesulitan Susah</a>}
                description={`${
                  this.props.bankSoal.soals.filter(item => item.tingkatKesulitan === 'SUSAH').length
                } soal`}
              />
            </List.Item>
          </List>
        </Card>

        {soal && (
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
                  {soal.image && <img src={soal.image} width={200} alt="gambar soal" />}
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
                          initialContentState={JSON.parse(soal.pertanyaan)}
                        />
                      </div>

                      <div style={{ marginLeft: '20px' }}>
                        {soal.jawaban.map((jawaban) => {
                          console.log(soal.jawaban, 'ini jawaban');
                          return (
                            <Row key={jawaban.id}>
                              <Col span={1}>
                                <h4>{jawaban.title}.</h4>
                              </Col>
                              <Col span={18}>
                                <div className="readonly-editor">
                                  <div>
                                    {jawaban.image && (
                                      <img src={jawaban.image} alt="gambar jawaban" width={200} />
                                    )}
                                  </div>

                                  <Editor
                                    toolbarHidden
                                    readOnly
                                    initialContentState={JSON.parse(jawaban.content)}
                                  />
                                </div>
                              </Col>
                            </Row>
                          );
                        })}
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
                          <h4>Kunci jawaban: {soal.kunciJawaban}</h4>
                        </Tag>
                        <Tag
                          color={
                            soal.tingkatKesulitan === 'MUDAH'
                              ? 'green'
                              : soal.tingkatKesulitan === 'SEDANG'
                              ? 'orange'
                              : 'red'
                          }
                        >
                          {' '}
                          <h4>Tingkat Kesulitan : {soal.tingkatKesulitan}</h4>
                        </Tag>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </div>
          </Card>
        )}

        <Table
          bordered
          rowKey={record => record.mahasiswa.id}
          loading={this.props.loading}
          columns={this.columns}
          dataSource={this.props.soalMahasiswas}
          scroll={{ x: 1300 }}
        />
      </div>
    );
  }
}

export default ListKelas;
