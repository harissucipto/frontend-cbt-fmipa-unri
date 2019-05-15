/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Card, message, Form, Button, Input, Alert, Spin } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import PesanError from '../../PesanError';
import PIlihTingkatKesulitan from './PIlihTingkatKesulitan';

import PilihKunciJawaban from './PilihKunciJawaban';
import { CURRENT_QUERY } from './Profil';

const EDIT_SOAL = gql`
  mutation EDIT_SOAL(
    $pertanyaan: String!
    $kunciJawaban: String!
    $jawaban: [JawabanUpdateWithWhereUniqueWithoutSoalInput!]

    $id: ID!
    $image: String
  ) {
    updateSoal(
      data: {
        pertanyaan: $pertanyaan
        image: $image
        kunciJawaban: $kunciJawaban

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

      bankSoal {
        id
      }
    }
  }
`;

class FormEdit extends React.Component {
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

    renderEditor: false,
  };

  erorJaringan = () => {
    this.setState({ loading: false });
    message.error('Error koneksi jaringan internet buruk');
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
    }).catch(this.erorJaringan);
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
    }).catch(this.erorJaringan);
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
    }).catch(this.erorJaringan);
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
    }).catch(this.erorJaringan);
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
    }).catch(this.erorJaringan);
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

  componentWillMount() {
    const {
      pertanyaan, image, jawaban, tingkatKesulitan, kunciJawaban,
    } = this.props.soal;

    console.log(jawaban, 'ini jawaban apa saja');

    const findJawaban = title => jawaban.find(item => item.title === title);

    this.setState({
      pertanyaan: JSON.parse(pertanyaan),
      a: JSON.parse(findJawaban('a').content),
      b: JSON.parse(findJawaban('b').content),
      c: JSON.parse(findJawaban('c').content),
      d: JSON.parse(findJawaban('d').content),
      tingkatKesulitan,
      kunciJawaban,
      image,
      imageA: findJawaban('a').image,
      imageB: findJawaban('b').image,
      imageC: findJawaban('c').image,
      imageD: findJawaban('d').image,
    });
  }

  translateContentState = editorState => convertToRaw(editorState.getCurrentContent());

  changePertanyaan = pertanyaan =>
    this.setState({ pertanyaan: this.translateContentState(pertanyaan) });
  changeA = content => this.setState({ a: this.translateContentState(content) });
  changeB = content => this.setState({ b: this.translateContentState(content) });
  changeC = content => this.setState({ c: this.translateContentState(content) });
  changeD = content => this.setState({ d: this.translateContentState(content) });

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
      id: this.props.id,
      pertanyaan: JSON.stringify(this.state.pertanyaan),
      kunciJawaban: this.state.kunciJawaban,
      bankSoal: this.props.id,
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

    await mutasi({
      variables: soalBaru,
    }).catch(() => message.error('Erorr tidak bisa membuat soal baru!'));
  };

  render() {
    return (
      <>
        <Card>
          <Mutation
            mutation={EDIT_SOAL}
            refetchQueries={[
              {
                query: CURRENT_QUERY,
                variables: {
                  id: this.props.bankSoal,
                },
              },
            ]}
          >
            {(createSoal, {
 error, data, loading, called,
}) => {
              if (loading) return <Spin tip="Loading.." />;

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
                    Simpan Soal
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
      <Query query={CURRENT_SOAL} variables={{ id: this.props.id }} fetchPolicy="network-only">
        {({ data, loading, error }) => (
          <Card style={{ margin: '20px' }} title="Edit  Soal" loading={loading}>
            <FormEdit soal={data.soal} id={this.props.id} bankSoal={this.props.bankSoal}/>
          </Card>
        )}
      </Query>
    );
  }
}

export default EditDosen;
