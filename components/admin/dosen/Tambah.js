import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Form, Input, Button, Avatar, Alert, Select } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { ALL_DOSEN_QUERY } from './ListDosen';
import { jurusans, prodis } from '../../../lib/jurusanProdi';

const { Content } = Layout;
const { Option } = Select;

const ADD_DOSEN_MUTATION = gql`
  mutation ADD_DOSEN_MUTATION($user: UserBaruInput, $dosen: DosenBaruInput) {
    addDosen(user: $user, dosen: $dosen) {
      id
      email
      dosen {
        nama
      }
    }
  }
`;

const HeaderAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  div {
    margin-top: 20px;
    text-align: center;
  }
`;

const DEFAULTSTATE = {
  email: '',
  password: '',
  nama: '',
  nip: '',
  jurusan: '',
  s: '',
  prodies: [],
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

  render() {
    return (
      <Mutation
        mutation={ADD_DOSEN_MUTATION}
        refetchQueries={[{ query: ALL_DOSEN_QUERY }]}
        variables={{
          user: {
            email: this.state.email,
            password: this.state.password,
          },
          dosen: {
            nama: this.state.nama,
            nip: this.state.nip,
          },
        }}
      >
        {(addDosen, {
 data, error, loading, called,
}) => (
  <Content>
    <Card
      style={{ margin: '20px', padding: '24px' }}
      title="Kelola Akun Dosen"
      style={{ maxWidth: '480px', margin: '20px', paddding: '20px' }}
    >
      <h2>Tambah Akun Dosen Baru</h2>
      <Form
        method="post"
        onSubmit={async (e) => {
                  e.preventDefault();
                  await addDosen();
                  this.setState({
                    ...DEFAULTSTATE,
                  });
                }}
      >
        <PesanError error={error} />
        {!error && !loading && called && (
        <Alert
          message={`Tambah Akun  Dosen ${data.addDosen.dosen.nama} Berhasil`}
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

        <Form.Item label="Password" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
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
          <Select placeholder="Pilih Jurusan" onChange={this.handleJurusanChange}>
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
                    Tambah
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
