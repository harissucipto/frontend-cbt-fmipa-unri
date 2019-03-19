import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { SEARCH_LIST } from './List';
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PilihMataKuliah from './PilihMataKuliah';

const { Content } = Layout;
const { Option } = Select;

const CREATE_BANK_SOAL = gql`
  mutation CREATE_BANK_SOAL($prodi: String!, $nama: String!, $mataKuliah: ID!) {
    createBankSoal(
      data: {
        nama: $nama
        mataKuliah: { connect: { id: $mataKuliah } }
        prodi: { connect: { nama: $prodi } }
      }
    ) {
      id
      nama
    }
  }
`;

const DEFAULTSTATE = {
  nama: '',
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
        mutation={CREATE_BANK_SOAL}
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
          prodi: this.state.prodi,
          mataKuliah: this.state.mataKuliah,
        }}
      >
        {(createMataKuliah, {
 data, error, loading, called,
}) => {
          if (!loading) console.log(data);
          return (
            <Content>
              <Card
                title="Kelola Bank Soal"
                style={{ maxWidth: '480px', margin: '20px', paddding: '20px' }}
              >
                <h2>Tambah Bank Soal</h2>
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
                      message={`Buat  bank soal  ${data.createBankSoal.nama} berhasil`}
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
                      placeholder="Nama Bank Soal"
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

                  <Form.Item label="MataKuliah" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <PilihMataKuliah
                      jurusan={this.state.jurusan}
                      prodi={this.state.prodi}
                      mataKuliahIni={this.state.mataKuliah}
                      rubahState={this.handeMataKuliahChange}
                    />
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