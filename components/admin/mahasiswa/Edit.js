import React, { Component } from 'react';
import { Card, Select, Form, Button, Input, Alert } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';


import { SEARCH_LIST } from './List';
import { CURRENT_QUERY} from './Profil'
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PesanError from '../../PesanError';

const { Option } = Select;

const MUTATION_UPDATE_DATA_DOSEN = gql`
  mutation MUTATION_UPDATE_DATA_DOSEN(
    $email: String!
    $prodi: String!
    $nama: String!
    $nim: String!
    $idMahasiswa: ID!
  ) {
    updateMahasiswa(
      where: { id: $idMahasiswa }
      data: {
        nama: $nama
        nim: $nim
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
    id: this.props.mahasiswa.id,
    email: this.props.mahasiswa.user.email,
    nama: this.props.mahasiswa.nama,
    nim: this.props.mahasiswa.nim,
    jurusan: this.props.mahasiswa.prodi.jurusan.nama,
    prodi: this.props.mahasiswa.prodi.nama,
    prodies: prodis[this.props.mahasiswa.prodi.jurusan.nama],
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
          nim: this.state.nim,
          prodi: this.state.prodi,
          idMahasiswa: this.state.id,
        }}
        refetchQueries={[{
          query: SEARCH_LIST, variables: {
            searchTerm: '',
            jurusan: '',
            prodi: '',
          }
        }]}
      >
        {(updateMahasiswa, {
 data, error, loading, called,
}) => (
  <Form
    method="post"
    onSubmit={async (e) => {
              e.preventDefault();
              await updateMahasiswa();
            }}
  >
    <PesanError error={error} />
    {!error && !loading && called && (
    <Alert
      message="Rubah informasi akun  mahasiswa berhasil"
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
        placeholder="Email mahasiswa"
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
        name="nim"
        value={this.state.nim}
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

    <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
      <Button type="primary" htmlType="submit">
                Simpan
      </Button>
    </Form.Item>
  </Form>
        )}
      </Mutation>
    );
  }
}

class EditDosen extends Component {
  render() {
    return (
      <Query query={CURRENT_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          return (
            <Card style={{ margin: '20px' }} title="Edit Informasi Akun Dosen" loading={loading}>
              <FormEdit mahasiswa={data.mahasiswa} />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default EditDosen;
