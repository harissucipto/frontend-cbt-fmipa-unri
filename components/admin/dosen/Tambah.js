import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { DOSENS_QUERY } from './Dosens';
import { jurusans, prodis } from '../../../lib/jurusanProdi';

const { Content } = Layout;
const { Option } = Select;

const CREATE_DOSEN_MUTATION = gql`
    mutation  CREATE_DOSEN_MUTATION(
      $email: String!
      $password: String!
      $passwordKasih: String!
      $prodi: String!
      $nama: String!
      $nip: String!
    ) {
    createUser(
      data: {
      email: $email
      password: $password
      passwordKasih: $passwordKasih
        dosen: {
          create: {
            nama: $nama
            nip: $nip
            prodi: {
              connect: [{ nama: $prodi }]
            }
          }
        }
      }
    )
    {
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
  nama: '',
  nip: '',
  jurusan: '',
  prodi: '',
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
        mutation={CREATE_DOSEN_MUTATION}
        refetchQueries={[{ query: DOSENS_QUERY }]}
        variables={{
            email: this.state.email.toLowerCase(),
            password: this.state.password,
            passwordKasih: this.state.password,
            nama: this.state.nama.toLowerCase(),
            nip: this.state.nip,
            prodi: this.state.prodi,
        }}
      >
        {(createDosen, {
 data, error, loading, called,
}) => (
  <Content>
    <Card
      title="Kelola Akun Dosen"
      style={{ maxWidth: '480px', margin: '20px', paddding: '20px' }}
    >
      <h2>Tambah Akun Dosen Baru</h2>
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
