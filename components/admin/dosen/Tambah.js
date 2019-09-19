import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select, Spin } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { SEARCH_DOSEN_QUERY1 } from './ListDosen';
import { jurusans, prodis } from '../../../lib/jurusanProdi';

const { Content } = Layout;
const { Option } = Select;

const CREATE_DOSEN_MUTATION = gql`
  mutation CREATE_DOSEN_MUTATION(
    $email: String!
    $password: String!
    $passwordKasih: String!
    $prodi: String!
    $nama: String!
    $nip: String!
    $image: String
  ) {
    createUser(
      data: {
        email: $email
        password: $password
        passwordKasih: $passwordKasih
        permissions: { set: [USER, DOSEN] }
        dosen: {
          create: { nama: $nama, nip: $nip, image: $image, prodi: { connect: { nama: $prodi } } }
        }
      }
    ) {
      id
      dosen {
        id
        nama
        nip
      }
    }
  }
`;

const DEFAULTSTATE = {
  email: '',
  password: '',
  image: '',
  nama: '',
  nip: '',
  jurusan: '',
  prodi: '',
  prodies: [],
  loading: false,
};

class TambahDosen extends React.Component {
  state = {
    ...DEFAULTSTATE,
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

  render() {
    return (
      <Mutation
        mutation={CREATE_DOSEN_MUTATION}
        refetchQueries={[
          {
            query: SEARCH_DOSEN_QUERY1,
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
          nip: this.state.nip,
          prodi: this.state.prodi,
          image: this.state.image,
        }}
      >
        {(createDosen, {
 data, error, loading, called,
}) => (
  <Content>
    <Card title="Buat Akun Dosen Baru">
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
          message={`Buat akun  dosen ${data.createUser.dosen.nama} berhasil`}
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
            placeholder="Email dosen"
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
            placeholder="Password untuk login akun dosen"
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Form.Item label="Nama" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
          <Input
            disabled={loading}
            name="nama"
            value={this.state.nama}
            placeholder="Nama Lengkap Dosen"
            type="string"
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Form.Item label="NIP" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
          <Input
            disabled={loading}
            name="nip"
            value={this.state.nip}
            placeholder="NIP"
            type="string"
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Form.Item label="Jurusan" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
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
        )}
      </Mutation>
    );
  }
}

export default TambahDosen;
