import React, { Component } from 'react';
import { Card, Form, Input, Select, Button, Avatar, Alert } from 'antd';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { Qjurusans as jurusans, Qprodis as prodis } from '../../../lib/jurusanProdi';
import Dosens from './Dosens';
import ListDosen from './ListDosen';

const { Option } = Select;
const { Search } = Input;

const SEARCH_DOSEN_QUERY1 = gql`
  query SEARCH_DOSEN_QUERY($searchTerm: String!, $jurusan: String!, $prodi: String!) {
    dosens(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }, { nip_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
        ]
      }
    ) {
      id
      nama
      nip
      user {
        id
        email
        passwordKasih
      }
      prodi {
        id
        nama
        jurusan {
          id
          nama
        }
      }
    }
  }
`;

class KelolaDosen extends Component {
  state = {
    jurusan: '',
    prodi: '',
    prodies: [],
    loading: false,
    dosens: this.props.dosens,
    keyword: '',
  };

  handleJurusanChange = async (value) => {
    this.setState({
      prodies: prodis[value],
      jurusan: value,
      prodi: prodis[value][0],
      keyword: '',
    });
  };

  hapusDosen = (id) => {
    const { dosens } = this.state;
    const dosenSisa = dosens.filter(dosen => dosen.id !== id);
    this.setState({ dosens: dosenSisa });
  };

  handleProdiChange = async (value) => {
    this.setState({
      prodi: value,
      keyword: '',
    });
  };

  handleCari = async (value) => {
    this.setState({
      keyword: value,
    });
  };

  render() {
    return (
      <Card
        title="Kelola Akun Dosen"
        style={{ margin: '20px', padding: '24px' }}
        extra={
          <Button type="dashed" onClick={() => Router.push('/admin/dosen/tambah')}>
            Tambah Akun
          </Button>
        }
      >
        <Form>
          <Form.Item
            label="Jurusan"
            style={{ maxWidth: '480px' }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Select
              defaultValue={jurusans[0]}
              placeholder="Pilih Jurusan"
              onChange={value => this.handleJurusanChange(value)}
            >
              {jurusans.map(jurusan => (
                <Option key={jurusan} value={jurusan}>
                  {jurusan.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Program Studi"
            style={{ maxWidth: '480px' }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Select
              placeholder="Pilih Prodi"
              disabled={!this.state.jurusan.length || this.state.jurusan === 'semua'}
              value={this.state.prodi}
              onChange={value => this.handleProdiChange(value)}
            >
              {this.state.prodies.map(prodiku => (
                <Option key={prodiku} value={prodiku}>
                  {prodiku.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Total Akun"
            style={{ maxWidth: '480px' }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '20px',
            }}
          >
            <Search
              onChange={(e) => {
                e.persist();
                this.setState({ keyword: e.target.value });
              }}
              value={this.state.keyword}
              style={{ maxWidth: '480px' }}
              placeholder="Masukan Nama atau NIP"
              enterButton="Cari akun"
              onSearch={value => this.handleCari(value)}
            />
          </div>
        </Form>

        <ListDosen
          keyword={this.state.keyword || ''}
          prodi={this.state.prodi === 'semua' ? '' : this.state.prodi}
          jurusan={this.state.jurusan === 'semua' ? '' : this.state.jurusan}
        />
      </Card>
    );
  }
}

const Kelola = () => <KelolaDosen />;

export default Kelola;
