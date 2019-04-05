import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select, Row, Col } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import PesanError from '../../PesanError';
import { CURRENT_QUERY } from './Profil';
import DetailBankSoal from './DetailBankSoal';
import PIlihTingkatKesulitan from './PIlihTingkatKesulitan';
import Pertanyaan from './Pertanyaan';
import Jawaban from './Jawaban';
import PilihKunciJawaban from './PilihKunciJawaban';

const CREATE_SOAL = gql`
  mutation CREATE_SOAL(
    $pertanyaan: String!
    $kunciJawaban: String!
    $jawaban: [JawabanCreateWithoutSoalInput!]
    $tingkatKesulitan: String!
    $bankSoal: ID!
  ) {
    createSoal(
      data: {
        pertanyaan: $pertanyaan
        kunciJawaban: $kunciJawaban
        bankSoal: { connect: { id: $bankSoal } }
        tingkatKesulitan: $tingkatKesulitan
        jawaban: { create: $jawaban }
      }
    ) {
      bankSoal {
        nama
      }
    }
  }
`;

class TambahSoal extends React.Component {
  state = {
    pertanyaan: EditorState.createEmpty(),
    a: EditorState.createEmpty(),
    b: EditorState.createEmpty(),
    c: EditorState.createEmpty(),
    d: EditorState.createEmpty(),

    kunciJawaban: undefined,
    tingkatKesulitan: undefined,
    renderEditor: false,
  };

  componentDidMount() {
    this.setState({ renderEditor: true });
  }

  changePertanyaan = pertanyaan => this.setState({ pertanyaan });
  changeA = a => this.setState({ a });
  changeB = b => this.setState({ b });
  changeC = c => this.setState({ c });
  changeD = d => this.setState({ d });

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  pushJawaban = (e) => {
    const { name, value } = e.target;

    const jawaban = this.state.jawaban.map((jawab) => {
      if (jawab.key === name) {
        return {
          ...jawab,
          value,
        };
      }
      return jawab;
    });

    this.setState({
      jawaban,
    });
  };

  changeTingkatKesulitan = (tingkatKesulitan) => {
    this.setState({ tingkatKesulitan });
  };

  changeKunciJawaban = (kunciJawaban) => {
    this.setState({ kunciJawaban });
  };

  valueJawaban = name => this.state.jawaban.filter(jawab => jawab.key === name)[0].value;

  createSoal = async (mutasi) => {
    console.log('make');

    const soalBaru = {
      pertanyaan: JSON.stringify(convertToRaw(this.state.pertanyaan.getCurrentContent())),
      kunciJawaban: this.state.kunciJawaban,
      bankSoal: this.props.id,
      tingkatKesulitan: this.state.tingkatKesulitan,
      jawaban: [
        {
          title: 'a',
          content: JSON.stringify(convertToRaw(this.state.a.getCurrentContent())),
        },
        {
          title: 'b',
          content: JSON.stringify(convertToRaw(this.state.b.getCurrentContent())),
        },
        {
          title: 'c',
          content: JSON.stringify(convertToRaw(this.state.c.getCurrentContent())),
        },
        {
          title: 'd',
          content: JSON.stringify(convertToRaw(this.state.d.getCurrentContent())),
        },
      ],
    };

    console.log(soalBaru);
    await mutasi({
      variables: soalBaru,
    });
    this.setState({
      pertanyaan: '',
      jawaban: [
        {
          key: 'a',
          value: '',
        },
        {
          key: 'b',
          value: '',
        },
        {
          key: 'c',
          value: '',
        },
        {
          key: 'd',
          value: '',
        },
      ],
      kunciJawaban: undefined,
      tingkatKesulitan: undefined,
    });
  };

  render() {
    return (
      <>
        <Card title="Buat Soal">
          <Mutation
            mutation={CREATE_SOAL}
            refetchQueries={[
              {
                query: CURRENT_QUERY,
                variables: {
                  id: this.props.id,
                },
              },
            ]}
          >
            {(createSoal, {
 error, data, loading, called,
}) => {
              if (loading) return <p>loading...</p>;

              return (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.createSoal(createSoal);
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message="Buat soal berhasil"
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}
                  <Form.Item label="Tingkat Kesulitan">
                    <PIlihTingkatKesulitan
                      value={this.state.tingkatKesulitan}
                      onChange={this.changeTingkatKesulitan}
                    />
                  </Form.Item>
                  <Form.Item label="Pertanyaan">
                    {this.state.renderEditor && (
                      <Editor
                        initialEditorState={this.state.pertanyaan}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.changePertanyaan}
                      />
                    )}
                  </Form.Item>

                  <Form.Item label="Jawaban">
                    <Form.Item label="A">
                      {this.state.renderEditor && (
                        <Editor
                          initialEditorState={this.state.a}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={this.changeA}
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="B">
                      {this.state.renderEditor && (
                        <Editor
                          initialEditorState={this.state.b}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={this.changeB}
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="C">
                      {this.state.renderEditor && (
                        <Editor
                          initialEditorState={this.state.c}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={this.changeC}
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="D">
                      {this.state.renderEditor && (
                        <Editor
                          initialEditorState={this.state.d}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={this.changeD}
                        />
                      )}
                    </Form.Item>
                  </Form.Item>

                  <Form.Item label="Kunci Jawaban">
                    <PilihKunciJawaban
                      data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }]}
                      value={this.state.kunciJawaban}
                      onChange={this.changeKunciJawaban}
                    />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Buat Soal
                  </Button>
                </Form>
              );
            }}
          </Mutation>
        </Card>
      </>
    );
  }
}

export default TambahSoal;
