import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Form, Input, Button, Avatar, Alert } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from './PesanError';
const { Content } = Layout;

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

  render() {
    return (
      <Mutation
        mutation={ADD_DOSEN_MUTATION}
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
    <Card style={{ margin: '20px', padding: '24px' }}>
      <h2>Tambah Akun Dosen Baru</h2>
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

        <Form.Item label="Email">
          <Input
            disabled={loading}
            name="email"
            value={this.state.email}
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
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Form.Item label="Nama">
          <Input
            disabled={loading}
            name="nama"
            value={this.state.nama}
            type="string"
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Form.Item label="NIP">
          <Input
            disabled={loading}
            name="nip"
            value={this.state.nip}
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

export default TambahDosen;
