import React, { Component } from 'react';
import { Card, Select, Form, Button, Input, Alert } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { SEARCH_LIST } from './List';
import { CURRENT_QUERY } from './Profil';
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PesanError from '../../PesanError';

const { Option } = Select;

const MUTATION_UPDATE_DATA_DOSEN = gql`
  mutation MUTATION_UPDATE_DATA_DOSEN(
    $prodi: String!
    $nama: String!
    $kode: String!
    $id: ID!
  ) {
    updateMataKuliah(
      where: { id: $id }
      data: {
        nama: $nama
        kode: $kode
        prodi: { connect: { nama: $prodi } }
      }
    ) {
      id
      nama
    }
  }
`;

class FormEdit extends Component {
  state = {
    id: this.props.mataKuliah.id,
    nama: this.props.mataKuliah.nama,
    kode: this.props.mataKuliah.kode,
    jurusan: this.props.mataKuliah.prodi.jurusan.nama,
    prodi: this.props.mataKuliah.prodi.nama,
    prodies: prodis[this.props.mataKuliah.prodi.jurusan.nama],
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
          nama: this.state.nama.toLowerCase(),
          kode: this.state.kode,
          prodi: this.state.prodi,
          id: this.state.id,
        }}
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
      >
        {(updateMataKuliah, {
 data, error, loading, called,
}) => (
  <Form
    method="post"
    onSubmit={async (e) => {
              e.preventDefault();
              await updateMataKuliah();
            }}
  >
    <PesanError error={error} />
    {!error && !loading && called && (
    <Alert
      message="Rubah informasi akun  mataKuliah berhasil"
      type="success"
      showIcon
      style={{ margin: '10px 0' }}
    />
            )}

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

    <Form.Item label="Kode MK" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <Input
        disabled={loading}
        name="kode"
        value={this.state.kode}
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
        {({ data, loading, error }) => (
          <Card title="Edit Informasi Mata Kuliah" loading={loading}>
            <FormEdit mataKuliah={data.mataKuliah} />
          </Card>
          )}
      </Query>
    );
  }
}

export default EditDosen;
