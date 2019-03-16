import React, { Component } from 'react';
import { Card, Form, Input, Select, Button, Avatar, Alert } from 'antd';
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

  render() {
    return (
      <Query query={CURRENT_QUERY} variables={{ id: this.props.kelas }} fetchPolicy="network-only">
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data) return <p>Anda Kesalahan..</p>;
          console.log(data, 'data profil');
          return (
            <Card
              title="Tambah Mahasiswa ke Kelas"
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
              <Card>
                <p>Nama Kelas: {data.kelas.nama}</p>
                <p>Mata Kuliah: {data.kelas.mataKuliah.nama}</p>
                <p>Jurusan: {data.kelas.prodi.jurusan.nama}</p>
                <p>Prodi: {data.kelas.prodi.nama}</p>
                <p>Dosen: {data.kelas.dosen ? data.kelas.dosen.nama : ''}</p>
              </Card>

              <Card>
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
                    enterButton="Cari akun"
                  />
                </div>
                <ListMahasiswaBelumDiKelas
                  prodi={data.kelas.prodi.nama}
                  jurusan={data.kelas.prodi.jurusan.nama}
                  kelas={data.kelas.id}
                />
              </Card>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default TambahMahasiswa;
