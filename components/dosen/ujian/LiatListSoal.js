/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button, Input, Select, Form, Card, Row, Col, Tag } from 'antd';

import { ConvertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const { Option } = Select;

const ReadOnlyEditor = (props) => {
  const storedState = ConvertFromRaw(JSON.parse(props.storedState));
  return (
    <div className="readonly-editor">
      <Editor editorState={storedState} readOnly />
    </div>
  );
};

class ListKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSoal: '',
      display: false,
    };

    this.columns = [
      {
        title: 'No.',
        key: 'nomor',
        render: (text, record, i) => <p>{i + 1}</p>,
      },
      {
        title: 'Pertanyaan',
        dataIndex: 'pertanyaan',
        key: 'pertanyaan',
        render: (text, record) => (
          <div className="readonly-editor">
            <Editor toolbarHidden readOnly initialContentState={JSON.parse(record.pertanyaan)} />
          </div>
        ),
      },
      {
        title: 'Jawaban',
        dataIndex: 'pilihanJawab',
        key: 'pilihanJawab',
        render: (text, record, i) =>
          record.jawaban.map(item => (
            <div className="readonly-editor" key={item.id}>
              <Editor toolbarHidden readOnly initialContentState={JSON.parse(item.content)} />
            </div>
          )),
      },
      {
        title: 'Kunci Jawaban',
        dataIndex: 'kunciJawaban',
        key: 'kunciJawaban',
      },
    ];
  }

  componentDidMount() {
    this.setState({ display: true });
  }

  handleTingkatKesulitanSoal = soals =>
    (this.state.filterSoal === ''
      ? soals
      : soals.filter(soal => soal.tingkatKesulitan === this.state.filterSoal));

  render() {
    return (
      <>
        <Form.Item label="Total Soal" labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
          {this.props.soals.length ? this.handleTingkatKesulitanSoal(this.props.soals).length : 0}
        </Form.Item>

        {this.props.soals.length ? (
          this.handleTingkatKesulitanSoal(this.props.soals).map((soal, i) => {

            return (
              <Card key={soal.id} style={{ border: '1px solid black', marginBottom: '10px' }}>
                <Row gutter={40}>
                  <Col span={1}>
                    {i + 1}
                  </Col>
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
                          {soal.jawaban.map(jawaban => (
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
                            <h4>Kunci jawaban: {soal.kunciJawaban}</h4>
                          </Tag>

                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              </Card>
            );
          })
        ) : (
          <p>Belum Ada</p>
        )}

      </>
    );
  }
}

export default ListKelas;
