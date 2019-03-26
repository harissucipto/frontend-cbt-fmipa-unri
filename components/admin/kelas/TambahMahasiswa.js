import React, { Component } from 'react';
import { Card, Form, Input, Select, Button, Avatar, Alert, Row, Col, Icon } from 'antd';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Query, Mutation } from 'react-apollo';

import ListMahasiswaBelumDiKelas from './ListMahasiswaBelumDiKelas';
import { Qjurusans as jurusans, Qprodis as prodis } from '../../../lib/jurusanProdi';
import { CURRENT_QUERY } from './Profil';

const { Search } = Input;

class TambahMahasiswa extends Component {
  state = {
    jurusan: '',
    prodi: '',
    prodies: [],
    keyword: '',
    belumKeyword: '',
  };

  handleCari = async (value) => {
    this.setState({
      keyword: value,
    });
  };

  render() {
    return (
      <Query query={CURRENT_QUERY} variables={{ id: this.props.kelas }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data) return <p>Anda Kesalahan..</p>;
          console.log(data, 'data profil');
          return (
            <>
              <Card
                title="Tambah Mahasiswa ke Kelas"
                style={{ marginBottom: '20px' }}
                extra={
                  <Button
                    size="large"
                    type="primary"
                    onClick={() => Router.push(`/admin/kelas/profil?id=${this.props.kelas}`)}
                  >
                    Lihat Daftar Mahasiswa yang telah terdaftar
                  </Button>
                }
              >
                <Row type="flex" gutter="40">
                  <Col md="8">
                    <p>
                      <Icon type="bank" /> Nama Kelas: {data.kelas.nama}
                    </p>
                  </Col>
                  <Col md="8">
                    <p>
                      <Icon type="read" /> Mata Kuliah: {data.kelas.mataKuliah.nama}
                    </p>
                  </Col>
                  <Col md="8">
                    <p>
                      <Icon type="deployment-unit" /> Jurusan: {data.kelas.prodi.jurusan.nama}
                    </p>
                  </Col>
                  <Col md="8">
                    <p>
                      <Icon type="cluster" /> Prodi: {data.kelas.prodi.nama}
                    </p>
                  </Col>
                  <Col md="8">
                    <p>
                      <Icon type="user" /> Dosen: {data.kelas.dosen ? data.kelas.dosen.nama : ''}
                    </p>
                  </Col>
                </Row>
              </Card>

              <Card title="Daftar Mahasiswa">
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
                <ListMahasiswaBelumDiKelas
                  prodi={data.kelas.prodi.nama}
                  jurusan={data.kelas.prodi.jurusan.nama}
                  kelas={data.kelas.id}
                  keyword={this.state.keyword}
                />
              </Card>
            </>
          );
        }}
      </Query>
    );
  }
}

export default TambahMahasiswa;
