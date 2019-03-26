import React, { Component } from 'react';
import { Card, Select, Form, Button, Input, Alert } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { SEARCH_LIST } from './List';
import { CURRENT_QUERY } from './Profil';
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PesanError from '../../PesanError';
import PIlihDosen from './PIlihDosen';
import PilihMataKuliah from './PilihMataKuliah';

const { Option } = Select;

const MUTATION_UPDATE_KELAS = gql`
  mutation MUTATION_UPDATE_KELAS(
    $prodi: String!
    $nama: String!
    $dosen: ID!
    $mataKuliah: ID!
    $id: ID!
  ) {
    updateKelas(
      where: { id: $id }
      data: {
        nama: $nama
        mataKuliah: { connect: { id: $mataKuliah } }
        prodi: { connect: { nama: $prodi } }
        dosen: { connect: { id: $dosen } }
      }
    ) {
      id
      nama
    }
  }
`;

class FormEdit extends Component {
  state = {
    id: this.props.kelas.id,
    nama: this.props.kelas.nama,
    jurusan: this.props.kelas.prodi.jurusan.nama,
    prodi: this.props.kelas.prodi.nama,
    prodies: prodis[this.props.kelas.prodi.jurusan.nama],
    dosen: this.props.kelas.dosen ? this.props.kelas.dosen.id : undefined,
    mataKuliah: this.props.kelas.mataKuliah ? this.props.kelas.mataKuliah.id : undefined,
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
      mataKuliah: undefined,
    });
  };

  handleProdiChange = (value) => {
    this.setState({
      prodi: value,
      mataKuliah: undefined,
    });
  };

  handeMataKuliahChange = (value) => {
    this.setState({ mataKuliah: value });
  };

  handleDosenChange = (value) => {
    console.log(value, 'ini');
    this.setState({ dosen: value });
  };

  render() {
    return (
      <Mutation
        mutation={MUTATION_UPDATE_KELAS}
        variables={{
          nama: this.state.nama.toLowerCase(),
          prodi: this.state.prodi,
          dosen: this.state.dosen,
          mataKuliah: this.state.mataKuliah,
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
        {(updateKelas, {
 data, error, loading, called,
}) => (
  <Form
    method="post"
    onSubmit={async (e) => {
              e.preventDefault();
              await updateKelas();
            }}
  >
    <PesanError error={error} />
    {!error && !loading && called && (
    <Alert
      message="Rubah informasi matakuliah  berhasil"
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

    <Form.Item label="MataKuliah" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <PilihMataKuliah
        jurusan={this.state.jurusan}
        prodi={this.state.prodi}
        mataKuliahIni={this.state.mataKuliah}
        rubahState={this.handeMataKuliahChange}
      />
    </Form.Item>

    <Form.Item label="Dosen" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      <PIlihDosen dosenIni={this.state.dosen} rubahState={this.handleDosenChange} />
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
          <Card title="Edit Informasi Kelas" loading={loading}>
            <FormEdit kelas={data.kelas} />
          </Card>
        )}
      </Query>
    );
  }
}

export default EditDosen;
