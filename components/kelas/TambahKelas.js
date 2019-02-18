import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Form, Input, Button, Avatar, Alert } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';
import { ALL_KELAS_QUERY } from './ListKelas';
const { Content } = Layout;

const ADD_KELAS_MUTATION = gql`
  mutation ADD_KELAS_MUTATION(
    $kelas: KelasBaruInput!
    $idDosen: ID!
    $idMahasiswa: ID!
    $idMataKuliah: ID!
  ) {
    addKelas(kelas: $kelas, idDosen: $idDosen, idDosen: $idMahasiswa, idMataKuliah: $idMataKuliah) {
      id
      nama
      mataKuliah {
        nama
      }
      tahunAjaran
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
  nama: '',
  tahunAjaran: '',
  kelas: {},
  dosen: {},
  mahasiswa: [],
};

class TambahKelas extends React.Component {
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
        mutation={ADD_KELAS_MUTATION}
        refetchQueries={[{ query: ALL_KELAS_QUERY }]}
        variables={{
          kelas: {
            nama: this.state.nama,
            kode: `${this.state.kode}`,
          },
        }}
      >
        {(addKelas, {
 data, error, loading, called,
}) => {
          console.log(data);
          return (
            <Content>
              <Card style={{ margin: '20px', padding: '24px' }}>
                <h2>Tambah Akun kelas Baru</h2>
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
                    await addKelas();
                    this.setState({
                      ...DEFAULTSTATE,
                    });
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message={`Tambah Mata Kuliah ${data.addKelas.nama} Berhasil`}
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
                      placeholder="Nama kelas"
                      type="string"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item label="Nama">
                    <Input
                      disabled={loading}
                      name="nama"
                      value={this.state.nama}
                      placeholder="Tahun Ajaran"
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

export default TambahKelas;
