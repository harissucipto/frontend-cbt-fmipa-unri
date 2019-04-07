import React, { Component } from 'react';
import { Card, Select, Form, Button, Input, Alert, Spin } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import PesanError from '../../PesanError';
import DetailBankSoal from './DetailBankSoal';
import PIlihTingkatKesulitan from './PIlihTingkatKesulitan';
import Pertanyaan from './Pertanyaan';
import Jawaban from './Jawaban';
import PilihKunciJawaban from './PilihKunciJawaban';

const EDIT_SOAL = gql`
  mutation EDIT_SOAL(
    $pertanyaan: String!
    $kunciJawaban: String!
    $jawaban: [JawabanUpdateWithWhereUniqueWithoutSoalInput!]
    $tingkatKesulitan: String!
    $id: ID!
    $image: String
  ) {
    updateSoal(
      data: {
        pertanyaan: $pertanyaan
        image: $image
        kunciJawaban: $kunciJawaban
        tingkatKesulitan: $tingkatKesulitan
        jawaban: { update: $jawaban }
      }
      where: { id: $id }
    ) {
      id
      bankSoal {
        id
      }
    }
  }
`;

const CURRENT_SOAL = gql`
  query CURRENT_SOAL($id: ID!) {
    soal(where: { id: $id }) {
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
      bankSoal {
        id
      }
    }
  }
`;

class FormEdit extends React.Component {
  state = {
    pertanyaan: JSON.parse(this.props.soal.pertanyaan) || EditorState.createEmpty(),
    a:
      JSON.parse(this.props.soal.jawaban.find(jawaban => jawaban.title === 'a').content) ||
      EditorState.createEmpty(),
    b:
      JSON.parse(this.props.soal.jawaban.find(jawaban => jawaban.title === 'b').content) ||
      EditorState.createEmpty(),
    c:
      JSON.parse(this.props.soal.jawaban.find(jawaban => jawaban.title === 'c').content) ||
      EditorState.createEmpty(),
    d:
      JSON.parse(this.props.soal.jawaban.find(jawaban => jawaban.title === 'd').content) ||
      EditorState.createEmpty(),
    image: this.props.soal.image || '',
    imageA: this.props.soal.jawaban.find(jawaban => jawaban.title === 'a').image || '',
    imageB: this.props.soal.jawaban.find(jawaban => jawaban.title === 'b').image || '',
    imageC: this.props.soal.jawaban.find(jawaban => jawaban.title === 'c').image || '',
    imageD: this.props.soal.jawaban.find(jawaban => jawaban.title === 'd').image || '',
    loading: false,

    kunciJawaban: this.props.soal.kunciJawaban,
    tingkatKesulitan: this.props.soal.tingkatKesulitan,
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
      pertanyaan: JSON.stringify(this.state.pertanyaan),
      kunciJawaban: this.state.kunciJawaban,
      id: this.props.soal.id,
      tingkatKesulitan: this.state.tingkatKesulitan,
      image: this.state.image,
      jawaban: [
        {
          where: {
            id: this.props.soal.jawaban.find(jawaban => jawaban.title === 'a').id,
          },
          data: {
            image: this.state.imageA,
            content: JSON.stringify(this.state.a),
          },
        },
        {
          where: {
            id: this.props.soal.jawaban.find(jawaban => jawaban.title === 'b').id,
          },
          data: {
            image: this.state.imageB,
            content: JSON.stringify(this.state.b),
          },
        },
        {
          where: {
            id: this.props.soal.jawaban.find(jawaban => jawaban.title === 'c').id,
          },
          data: {
            image: this.state.imageC,
            content: JSON.stringify(this.state.c),
          },
        },
        {
          where: {
            id: this.props.soal.jawaban.find(jawaban => jawaban.title === 'd').id,
          },
          data: {
            image: this.state.imageD,
            content: JSON.stringify(this.state.d),
          },
        },
      ],
    };

    console.log(soalBaru);
    await mutasi({
      variables: soalBaru,
    });
  };

  render() {
    return (
      <>
        <Card title="Update Soal">
          <Mutation mutation={EDIT_SOAL}>
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
                      message="Update soal berhasil"
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
                        initialContentState={this.state.pertanyaan}
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
                          initialContentState={this.state.a}
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
                          initialContentState={this.state.b}
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
                          initialContentState={this.state.c}
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
                          initialContentState={this.state.d}
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
                    Simpan Perubahan
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

class EditDosen extends Component {
  render() {
    return (
      <Query query={CURRENT_SOAL} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => (
          <Card style={{ margin: '20px' }} title="Edit  Soal" loading={loading}>
            <FormEdit soal={data.soal} id={this.props.id} />
          </Card>
        )}
      </Query>
    );
  }
}

export default EditDosen;
