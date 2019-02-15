import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Form, Input, Button, Avatar, Alert } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';
import { ALL_MATAKULIAH_QUERY } from './ListMataKuliah';
const { Content } = Layout;

const ADD_MATAKULIAH_MUTATION = gql`
  mutation ADD_MATAKULIAH_MUTATION($mataKuliah: MataKuliahBaruInput!) {
    addMataKuliah(mataKuliah: $mataKuliah) {
      id
      kode
      nama
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
  kode: '',
  nama: '',
};

class TambahMataKuliah extends React.Component {
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
        mutation={ADD_MATAKULIAH_MUTATION}
        refetchQueries={[{ query: ALL_MATAKULIAH_QUERY }]}
        variables={{
          mataKuliah: {
            nama: this.state.nama,
            kode: `${this.state.kode}`,
          },
        }}
      >
        {(addMataKuliah, {
 data, error, loading, called,
}) => {
          console.log(data);
          return (
            <Content>
              <Card style={{ margin: '20px', padding: '24px' }}>
                <h2>Tambah Akun mataKuliah Baru</h2>
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
                    await addMataKuliah();
                    this.setState({
                      ...DEFAULTSTATE,
                    });
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message={`Tambah Mata Kuliah ${data.addMataKuliah.nama} Berhasil`}
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}

                  <Form.Item label="Nama">
                    <Input
                      disabled={loading}
                      name="nama"
                      value={this.state.nama}
                      placeholder="Nama Lengkap mataKuliah"
                      type="string"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item label="Kode">
                    <Input
                      disabled={loading}
                      name="kode"
                      value={this.state.kode}
                      placeholder="Kode  Mata Kuliah"
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
          );
        }}
      </Mutation>
    );
  }
}

export default TambahMataKuliah;
