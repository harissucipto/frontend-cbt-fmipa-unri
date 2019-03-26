import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { SEARCH_LIST } from './List';
import { jurusans, prodis } from '../../../lib/jurusanProdi';

const { Content } = Layout;
const { Option } = Select;

const CREATE_MATAKULIAH_MUTATION = gql`
  mutation CREATE_MATAKULIAH_MUTATION($prodi: String!, $nama: String!, $kode: String!) {
    createMataKuliah(data: { nama: $nama, kode: $kode, prodi: { connect: { nama: $prodi } } }) {
      id
      nama
      kode
    }
  }
`;

const DEFAULTSTATE = {
  nama: '',
  kode: '',
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
        mutation={CREATE_MATAKULIAH_MUTATION}
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
        variables={{
          nama: this.state.nama.toLowerCase(),
          kode: this.state.kode,
          prodi: this.state.prodi,
        }}
      >
        {(createMataKuliah, {
 data, error, loading, called,
}) => {
          if (!loading) console.log(data);
          return (
            <Content>
              <Card title="Tambah Mata Kuliah">
                <Form
                  method="post"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await createMataKuliah();
                    this.setState({
                      ...DEFAULTSTATE,
                    });
                    console.log(this.state);
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message={`Buat  mataKuliah  ${data.createMataKuliah.nama} berhasil`}
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}

                  <Form.Item label="Nama" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
                    <Input
                      disabled={loading}
                      name="nama"
                      value={this.state.nama}
                      placeholder="Nama Mata Kuliah"
                      type="string"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item label="Kode" labelCol={{ span: 6 }} wrapperCol={{ span: 18, lg: 10 }}>
                    <Input
                      disabled={loading}
                      name="kode"
                      value={this.state.kode}
                      placeholder="Kode Mata Kuliah"
                      type="string"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Jurusan"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
                    <Select placeholder="Pilih Jurusan" onChange={this.handleJurusanChange}>
                      {jurusans.map(jurusan => (
                        <Option key={jurusan} value={jurusan}>
                          {jurusan.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Program Studi"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
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
                      Tambah Baru
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Content>
          );
        }}
      </Mutation>
    );
  }
}

export default TambahDosen;
