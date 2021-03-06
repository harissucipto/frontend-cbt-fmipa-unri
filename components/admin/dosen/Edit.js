import React, { Component } from 'react';
import { Card, Select, Form, Button, Input, Alert, Spin } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_DOSEN_QUERY } from './Profil';
import { SEARCH_DOSEN_QUERY1 } from './ListDosen';
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PesanError from '../../PesanError';
import UpdatePassword from '../../dosen/UpdatePassword';

const { Option } = Select;

const MUTATION_UPDATE_DATA_DOSEN = gql`
  mutation MUTATION_UPDATE_DATA_DOSEN(
    $email: String!
    $prodi: String!
    $nama: String!
    $nip: String!
    $idDosen: ID!
    $image: String
  ) {
    updateDosen(
      where: { id: $idDosen }
      data: {
        nama: $nama
        nip: $nip
        image: $image
        prodi: { connect: { nama: $prodi } }
        user: { update: { email: $email } }
      }
    ) {
      id
      nama
    }
  }
`;

class FormEdit extends Component {
  state = {
    loading: false,
    id: this.props.dosen.id,
    email: this.props.dosen.user.email,
    nama: this.props.dosen.nama,
    image: this.props.dosen.image || '',
    nip: this.props.dosen.nip,
    jurusan: this.props.dosen.prodi.jurusan.nama,
    prodi: this.props.dosen.prodi.nama,
    prodies: prodis[this.props.dosen.prodi.jurusan.nama],
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
        mutation={MUTATION_UPDATE_DATA_DOSEN}
        variables={{
          email: this.state.email.toLowerCase(),
          nama: this.state.nama.toLowerCase(),
          nip: this.state.nip,
          prodi: this.state.prodi,
          idDosen: this.state.id,
          image: this.state.image,
        }}
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
      >
        {(updateDosen, {
 data, error, loading, called,
}) => {
          if (loading) return <Spin tip="loading..." style={{ textAlign: 'center' }} />;
          return (
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await updateDosen();
              }}
            >
              <PesanError error={error} />
              {!error && !loading && called && (
                <Alert
                  message="Rubah informasi akun  dosen berhasil"
                  type="success"
                  showIcon
                  style={{ margin: '10px 0' }}
                />
              )}

              <Form.Item label="Email" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
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

              <Form.Item label="Nama" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
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

              <Form.Item label="NIP" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
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

              <Form.Item label="Jurusan" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Select
                  placeholder="Pilih Jurusan"
                  onChange={this.handleJurusanChange}
                  value={this.state.jurusan}
                >
                  {jurusans.map(jurusan => (
                    <Option key={jurusan} value={jurusan}>
                      {jurusan.toUpperCase()}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Program Studi" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
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

              <Form.Item label="Photo Profil" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                {this.state.loading ? (
                  <Spin />
                ) : (
                  <>
                    {this.state.image && (
                      <img src={this.state.image} alt="Upload Preview" width="200" />
                    )}
                    <Input disabled={loading} name="image" type="file" onChange={this.uploadFile} />
                  </>
                )}
              </Form.Item>

              <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Simpan
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

class EditDosen extends Component {
  render() {
    return (
      <Query
        fetchPolicy="network-only"
        query={CURRENT_DOSEN_QUERY}
        variables={{ id: this.props.id }}
      >
        {({ data, loading, error }) => (
          <Card title="Edit Informasi Akun Dosen" loading={loading}>
            <FormEdit dosen={data.dosen} />
          </Card>
        )}
      </Query>
    );
  }
}

export default EditDosen;
