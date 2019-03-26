/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CURRENT_DOSEN_QUERY } from './Profil';

const MUTATION_DELETE_KELAS_TO_DOSEN = gql`
  mutation MUTATION_DELETE_KELAS_TO_DOSEN($idDosen: ID!, $idKelas: ID!) {
    updateDosen(where: { id: $idDosen }, data: { kelases: { disconnect: { id: $idKelas } } }) {
      id
      nama
    }
  }
`;

class ListKelas extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'No.',
        key: 'nomor',
        render: (text, record, i) => <span>{i + 1}</span>,
      },
      {
        title: 'Nama Kelas',
        dataIndex: 'nama',
        key: 'nama',
        render: (text, record) => (
          <Link
            href={{
              pathname: '/admin/kelas/profil',
              query: { id: record.id },
            }}
          >
            <a>{text}</a>
          </Link>
        ),
      },
      {
        title: 'Mata Kuliah',
        key: 'mataKuliah',
        dataIndex: 'mataKuliah.nama',
      },
      {
        title: 'Jurusan',
        dataIndex: 'prodi.jurusan.nama',
        key: 'jurusan',
      },
      {
        title: 'Program Studi',
        dataIndex: 'prodi.nama',
        key: 'prodi.nama',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Mutation
              mutation={MUTATION_DELETE_KELAS_TO_DOSEN}
              variables={{ idDosen: this.props.idDosen, idKelas: record.id }}
              update={(cache, payload) => {
                const data = cache.readQuery({
                  query: CURRENT_DOSEN_QUERY,
                  variables: { id: this.props.idDosen },
                });

                console.log(data.dosen.kelases);
                data.dosen.kelases = data.dosen.kelases.filter(item => item.id !== payload.data.updateDosen.id);
                console.log(data.dosen.kelases);

                cache.writeQuery({ query: CURRENT_DOSEN_QUERY, data });
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
        dataSource={this.props.kelases}
        rowKey={record => record.id}
        loading={this.props.loading}
      />
    );
  }
}

export default ListKelas;
