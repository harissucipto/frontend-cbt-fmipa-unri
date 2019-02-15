import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Form, Input, Button, Avatar, Alert } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';
import { ALL_PENGAWAS_QUERY } from './ListPengawas';
const { Content } = Layout;

const ADD_PENGAWAS_MUTATION = gql`
  mutation ADD_PENGAWAS_MUTATION($user: UserBaruInput, $pengawas: PengawasBaruInput) {
    addPengawas(user: $user, pengawas: $pengawas) {
      id
      email
      pengawas {
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
};

class TambahPengawas extends React.Component {
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
        mutation={ADD_PENGAWAS_MUTATION}
        refetchQueries={[{ query: ALL_PENGAWAS_QUERY }]}
        variables={{
          user: {
            email: this.state.email,
            password: this.state.password,
          },
          pengawas: {
            nama: this.state.nama,
          },
        }}
      >
        {(addPengawas, {
 data, error, loading, called,
}) => (
  <Content>
    <Card style={{ margin: '20px', padding: '24px' }}>
      <h2>Tambah Akun pengawas Baru</h2>
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
                  await addPengawas();
                  this.setState({
                    ...DEFAULTSTATE,
                  });
                }}
      >
        <PesanError error={error} />
        {!error && !loading && called && (
        <Alert
          message={`Tambah Akun  pengawas ${data.addPengawas.pengawas.nama} Berhasil`}
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
            placeholder="Email pengawas"
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
            placeholder="Password untuk login akun pengawas"
            required
            onChange={this.saveToState}
          />
        </Form.Item>

        <Form.Item label="Nama">
          <Input
            disabled={loading}
            name="nama"
            value={this.state.nama}
            placeholder="Nama Lengkap pengawas"
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

export default TambahPengawas;
