/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CURRENT_QUERY } from './Profil';
import { MUTATAION_DELETE_KELAS_MAHASISWA } from './ListMahasiswaBelumDiKelas';

class ListKelas extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
        render: (text, record) => (
          <Link
            href={{
              pathname: '/admin/mahasiswa/profil',
              query: { id: record.id },
            }}
          >
            <a>{text}</a>
          </Link>
        ),
      },
      {
        title: 'NIM',
        dataIndex: 'nim',
        key: 'dosen',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Mutation
              mutation={MUTATAION_DELETE_KELAS_MAHASISWA}
              variables={{ kelas: this.props.kelas, mahasiswa: record.id }}
              update={(cache, payload) => {
                const data = cache.readQuery({
                  query: CURRENT_QUERY,
                  variables: { id: this.props.kelas },
                });

                console.log(data.kelas.mahasiswas);
                data.kelas.mahasiswas = data.kelas.mahasiswas.filter(item => item.id !== payload.data.updateMahasiswa.id);
                console.log(data.kelas.mahasiswas);
              }}
            >
              {(hapusKelas, { error, loading, called }) => {
                if (!error && !loading && called) {
                  console.log('panggil disini');
                }
                return <Button onClick={hapusKelas}>Hapus</Button>;
              }}
            </Mutation>
          </span>
        ),
      },
    ];
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.mahasiswas}
        rowKey={record => record.nim}
        loading={this.props.loading}
      />
    );
  }
}

export default ListKelas;
