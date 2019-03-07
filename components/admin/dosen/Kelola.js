import React, { Component } from 'react';
import { Card, Form, Input, Select, Button, Avatar, Alert } from 'antd';
import ListDosen from './ListDosen';

const { Option } = Select;

const jurusans = ['fisika', 'matematika', 'kimia', 'ilmu komputer'];
const prodi = {
  fisika: ['Fisika A'],
  matematika: ['Matematika A'],
  'ilmu komputer': ['sistem informasi', 'manajemen informatika'],
  kimia: ['Kimia A'],
};

class KelolaDosen extends Component {
  state = {
    jurusan: '',
    prodi: '',
    prodies: [],
    dosens: [],
  };

  handleJurusanChange = (value) => {
    this.setState({
      prodies: prodi[value],
      jurusan: value,
      prodi: '',
    });
  };

  handleProdiChange = (value) => {
    this.setState({
      prodi: value,
    });
  };

  render() {
    return (
      <Card title="Kelola Akun Dosen" style={{ margin: '20px', padding: '24px' }}>
        <Form>
          <Form.Item
            label="Jurusan"
            style={{ maxWidth: '480px' }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
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
            style={{ maxWidth: '480px' }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Select
              placeholder="Pilih Prodi"
              disabled={!this.state.jurusan.length}
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

          <Form.Item
            label="Total Akun"
            style={{ maxWidth: '480px' }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <p>60 Akun</p>
          </Form.Item>
        </Form>

        <Form.Item />

        <ListDosen />
      </Card>
    );
  }
}

export default KelolaDosen;
