import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select, Spin } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { SEARCH_LIST } from './List';
import { jurusans, prodis } from '../../../lib/jurusanProdi';

const { Content } = Layout;
const { Option } = Select;

const CREATE_MAHASISWA_MUTATION = gql`
  mutation CREATE_MAHASISWA_MUTATION(
    $email: String!
    $password: String!
    $passwordKasih: String!
    $prodi: String!
    $nama: String!
    $nim: String!
    $image: String
  ) {
    createUser(
      data: {
        email: $email
        password: $password
        passwordKasih: $passwordKasih
        permissions: { set: [USER, MAHASISWA] }
        mahasiswa: {
          create: { nama: $nama, nim: $nim, image: $image, prodi: { connect: { nama: $prodi } } }
        }
      }
    ) {
      id
      mahasiswa {
        id
        nama
        nim
      }
    }
  }
`;

const DEFAULTSTATE = {
  email: '',
  password: '',
  nama: '',
  nim: '',
  jurusan: '',
  prodi: '',
  prodies: [],
  image: '',
  loading: false,
};

class TambahDosen extends React.Component {
  state = {
    ...DEFAULTSTATE,
  };

  uploadFile = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files);

    const res = await fetch('http://localhost:3200/api/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.fileUrl,
      loading: false,
    });
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleJurusanChange = (value) => {
    this.setState({
      prodies: prodis[value],
      jurusan: value,
      prodi: prodis[value][0],
    });
  };

  handleProdiChange = async (value) => {
    this.setState({
      prodi: value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_MAHASISWA_MUTATION}
        refetchQueries={[
          {
            query: SEARCH_LIST,
            variables: {
              searchTerm: '',
              jurusan: '',
              prodi: '',
            },
          },
        ]}
        variables={{
          email: this.state.email.toLowerCase(),
          password: this.state.password,
          passwordKasih: this.state.password,
          nama: this.state.nama.toLowerCase(),
          nim: this.state.nim,
          prodi: this.state.prodi,
          image: this.state.image,
        }}
      >
        {(createDosen, {
 data, error, loading, called,
}) => {
          if (loading) return <Spin tip="Loading..." style={{ textAlign: 'center' }} />;
          return (
            <Content>
              <Card title="Buat Akun Mahasiswa">
                <Form
                  method="post"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await createDosen();
                    this.setState({
                      ...DEFAULTSTATE,
                    });
                    console.log(this.state);
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message={`Buat akun  mahasiswa ${data.createUser.mahasiswa.nama} berhasil`}
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}

                  <Form.Item label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
                    <Input
                      disabled={loading}
                      name="email"
                      value={this.state.email}
                      placeholder="Email mahasiswa"
                      type="email"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
                    <Input
                      disabled={loading}
                      name="password"
                      value={this.state.password}
                      type="password"
                      placeholder="Password untuk login akun mahasiswa"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item label="Nama" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
                    <Input
                      disabled={loading}
                      name="nama"
                      value={this.state.nama}
                      placeholder="Nama Lengkap"
                      type="string"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item label="NIM" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
                    <Input
                      disabled={loading}
                      name="nim"
                      value={this.state.nim}
                      placeholder="Nomor Induk Mahasiswa"
                      type="string"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Jurusan"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
                    <Select placeholder="Pilih Jurusan" onChange={this.handleJurusanChange}>
                      {jurusans.map(jurusan => (
                        <Option key={jurusan} value={jurusan}>
                          {jurusan.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Program Studi"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
                    <Select
                      placeholder="Pilih Prodi"
                      disabled={!this.state.jurusan.length || this.state.jurusan === 'semua'}
                      value={this.state.prodi}
                      onChange={this.handleProdiChange}
                    >
                      {this.state.prodies.map(prodiku => (
                        <Option key={prodiku} value={prodiku}>
                          {prodiku.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Gambar Profil"
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

                  <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                      Buat Akun
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Content>
          );
        }}
      </Mutation>
    );
  }
}

export default TambahDosen;
