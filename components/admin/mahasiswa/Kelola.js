import React, { Component } from 'react';
import { Card, Form, Input, Select, Button, Avatar, Alert } from 'antd';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { Qjurusans as jurusans, Qprodis as prodis } from '../../../lib/jurusanProdi';
import List from './List';

const { Option } = Select;
const { Search } = Input;

class KelolaMahasiwa extends Component {
  state = {
    jurusan: '',
    prodi: '',
    prodies: [],
    keyword: '',
  };

  handleJurusanChange = async (value) => {
    this.setState({
      prodies: prodis[value],
      jurusan: value,
      prodi: prodis[value][0],
      keyword: '',
      belumKeyword: '',
    });
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
        title="Informasi Akun Mahasiswa"
        extra={
          <Button type="primary" onClick={() => Router.push('/admin/mahasiswa/tambah')}>
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
                this.setState({ belumKeyword: e.target.value });
              }}
              value={this.state.belumKeyword}
              style={{ maxWidth: '480px' }}
              placeholder="Masukan Nama atau NIM"
              enterButton="Cari"
              onSearch={value => this.handleCari(value)}
            />
          </div>
        </Form>

        <List
          keyword={this.state.keyword || ''}
          prodi={this.state.prodi === 'semua' ? '' : this.state.prodi}
          jurusan={this.state.jurusan === 'semua' ? '' : this.state.jurusan}
        />
      </Card>
    );
  }
}

const Kelola = () => <KelolaMahasiwa />;

export default Kelola;
