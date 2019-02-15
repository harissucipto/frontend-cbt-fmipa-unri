import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Form, Input, Button, Avatar, Alert } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';
import { ALL_MAHASISWA_QUERY } from './ListMahasiswa';
const { Content } = Layout;

const ADD_MAHASISWA_MUTATION = gql`
  mutation ADD_MAHASISWA_MUTATION($user: UserBaruInput, $mahasiswa: MahasiswaBaruInput) {
    addMahasiswa(user: $user, mahasiswa: $mahasiswa) {
      id
      email
      mahasiswa {
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
  nim: '',
};

class TambahMahasiswa extends React.Component {
  state = {
    ...DEFAULTSTATE,
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_MAHASISWA_MUTATION}
        refetchQueries={[{ query: ALL_MAHASISWA_QUERY }]}
        variables={{
          user: {
            email: this.state.email,
            password: this.state.password,
          },
          mahasiswa: {
            nama: this.state.nama,
            nim: this.state.nim,
          },
        }}
      >
        {(addMahasiswa, {
 data, error, loading, called,
}) => (
  <Content>
    <Card style={{ margin: '20px', padding: '24px' }}>
      <h2>Tambah Akun mahasiswa Baru</h2>
      <HeaderAvatar>
        <Avatar size={144} icon="user" />
        <div>
          <Button icon="upload">Upload photo profil</Button>
        </div>
      </HeaderAvatar>

      <Form
        method="post"
        onSubmit={async (e) => {
                  e.preventDefault();
                  await addMahasiswa();
                  this.setState({
                    ...DEFAULTSTATE,
                  });
                }}
      >
        <PesanError error={error} />
        {!error && !loading && called && (
        <Alert
          message={`Tambah Akun  mahasiswa ${data.addMahasiswa.mahasiswa.nama} Berhasil`}
          type="success"
          showIcon
          style={{ margin: '10px 0' }}
        />
                )}

        <Form.Item label="Email">
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

        <Form.Item label="Password">
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

        <Form.Item label="Nama">
          <Input
            disabled={loading}
            name="nama"
            value={this.state.nama}
            placeholder="Nama Lengkap mahasiswa"
            type="string"
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Form.Item label="NIM">
          <Input
            disabled={loading}
            name="nim"
            value={this.state.nim}
            placeholder="nim"
            type="string"
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
                  Tambah
        </Button>
      </Form>
    </Card>
  </Content>
        )}
      </Mutation>
    );
  }
}

export default TambahMahasiswa;
