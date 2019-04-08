import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select, Row, Col, Spin } from 'antd';
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
    $image: String
  ) {
    createSoal(
      data: {
        pertanyaan: $pertanyaan
        image: $image
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
    image: '',
    imageA: '',
    imageB: '',
    imageC: '',
    imageD: '',
    loading: false,

    kunciJawaban: undefined,
    tingkatKesulitan: undefined,
    renderEditor: false,
  };

  uploadFile = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/pekonrejosari/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      loading: false,
    });
  };

  uploadFileA = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/pekonrejosari/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      imageA: file.secure_url,
      loading: false,
    });
  };

  uploadFileB = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/pekonrejosari/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      imageB: file.secure_url,
      loading: false,
    });
  };

  uploadFileC = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/pekonrejosari/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      imageC: file.secure_url,
      loading: false,
    });
  };

  uploadFileD = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/pekonrejosari/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      imageD: file.secure_url,
      loading: false,
    });
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
      image: this.state.image,
      jawaban: [
        {
          title: 'a',
          image: this.state.imageA,
          content: JSON.stringify(convertToRaw(this.state.a.getCurrentContent())),
        },
        {
          title: 'b',
          image: this.state.imageB,
          content: JSON.stringify(convertToRaw(this.state.b.getCurrentContent())),
        },
        {
          title: 'c',
          image: this.state.imageC,
          content: JSON.stringify(convertToRaw(this.state.c.getCurrentContent())),
        },
        {
          title: 'd',
          image: this.state.imageD,
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
      image: '',
      imageA: '',
      imageB: '',
      imageC: '',
      imageD: '',
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
              if (loading) return <Spin tip="Loading.." />

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
                    <Form.Item
                      label="Gambar"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18, lg: 10 }}
                    >
                      {this.state.loading ? (
                        <Spin />
                      ) : (
                        <>
                          {this.state.image && (
                            <img src={this.state.image} alt="Upload Preview" width="200" />
                          )}
                          <Input
                            disabled={loading}
                            name="image"
                            type="file"
                            onChange={this.uploadFile}
                          />
                        </>
                      )}
                    </Form.Item>
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
                      <Form.Item
                        label="Gambar"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18, lg: 10 }}
                      >
                        {this.state.loading ? (
                          <Spin />
                        ) : (
                            <>
                              {this.state.imageA && (
                                <img src={this.state.imageA} alt="Upload Preview" width="200" />
                              )}
                              <Input
                                disabled={loading}
                                name="image"
                                type="file"
                                onChange={this.uploadFileA}
                              />
                            </>
                          )}
                      </Form.Item>
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
                      <Form.Item
                        label="Gambar"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18, lg: 10 }}
                      >
                        {this.state.loading ? (
                          <Spin />
                        ) : (
                            <>
                              {this.state.imageB && (
                                <img src={this.state.imageB} alt="Upload Preview" width="200" />
                              )}
                              <Input
                                disabled={loading}
                                name="image"
                                type="file"
                                onChange={this.uploadFileB}
                              />
                            </>
                          )}
                      </Form.Item>
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
                      <Form.Item
                        label="Gambar"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18, lg: 10 }}
                      >
                        {this.state.loading ? (
                          <Spin />
                        ) : (
                            <>
                              {this.state.imageC && (
                                <img src={this.state.imageC} alt="Upload Preview" width="200" />
                              )}
                              <Input
                                disabled={loading}
                                name="image"
                                type="file"
                                onChange={this.uploadFileC}
                              />
                            </>
                          )}
                      </Form.Item>
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
                      <Form.Item
                        label="Gambar"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18, lg: 10 }}
                      >
                        {this.state.loading ? (
                          <Spin />
                        ) : (
                            <>
                              {this.state.imageD && (
                                <img src={this.state.imageD} alt="Upload Preview" width="200" />
                              )}
                              <Input
                                disabled={loading}
                                name="image"
                                type="file"
                                onChange={this.uploadFileD}
                              />
                            </>
                          )}
                      </Form.Item>
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
