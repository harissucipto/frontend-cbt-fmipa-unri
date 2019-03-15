/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button, Input, Checkbox } from 'antd';
import gql from 'graphql-tag';
import { Query, ApolloConsumer } from 'react-apollo';

import Hapus from './Hapus';
import { SEARCH_LIST } from '../mahasiswa/List';

const MAHASISWA_BELUM_DI_KELAS = gql`
  query MAHASISWA_BELUM_DI_KELAS($searchTerm: String!, $jurusan: String!, $prodi: String!) {
    mahasiswas(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }, { nim_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
        ]
      }
    ) {
      id
      nama
      nim
      prodi {
        id
        nama
        jurusan {
          id
          nama
        }
      }
      kelases {
        id
        nama
      }
    }
  }
`;

class EditMahasiswa extends Component {
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
        key: 'nim',
      },
      {
        title: 'Program Studi',
        dataIndex: 'prodi.nama',
        key: 'prodi',
      },
      {
        title: 'Jurusan',
        dataIndex: 'prodi.jurusan.nama',
        key: 'jurusan',
      },
      {
        title: 'DiTambahkan',
        dataIndex: 'ditambahkan',
        key: 'ditambahkan',
        render: (text, record) => (
          <Checkbox checked={record.kelases} onChange={() => this.toggleCheckbox(record.id)} />
        ),
      },
    ];

    const kelasIni = this.props.kelas;
    console.log(kelasIni, '-ini kelas');

    const dataMahasiswa = this.props.mahasiswas ? this.props.mahasiswas : [];

    // map mahasiswa yang ada di kelas
    const mahasiswas = !dataMahasiswa.length
      ? []
      : this.props.mahasiswas.map(mahasiswa => ({
        ...mahasiswa,
        kelases: mahasiswa.kelases.length
          ? !!mahasiswa.kelases.filter(kelas => kelas.id === kelasIni).map(kelas => kelas.id)[0]
          : false,
      }));

    console.log(mahasiswas, 'ini data mahasiswas yang telah di map');

    this.state = {
      mahasiswas,
    };
  }

  toggleCheckbox = (id) => {
    const newMahasiswa = this.state.mahasiswas.map(mahasiswa =>
      (mahasiswa.id === id
        ? {
          ...mahasiswa,
          kelases: !mahasiswa.kelases,
        }
        : mahasiswa));

    this.setState({ mahasiswas: newMahasiswa });
  };

  render() {
    return (
      <Table
        dataSource={this.state.mahasiswas}
        columns={this.columns}
        rowKey={record => record.nim}
        loading={this.props.loading}
      />
    );
  }
}

class List extends Component {
  render() {
    const {
      prodi, jurusan, keyword, kelas,
    } = this.props;
    return (
      <Query
        query={SEARCH_LIST}
        variables={{
          searchTerm: '',
          jurusan,
          prodi,
        }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error }) => {
          console.log(data, 'ini data oy');
          if (loading) return <p>oading</p>;

          if (!data) return <p>kkkk</p>;
          return <EditMahasiswa mahasiswas={data.mahasiswas} loading={loading} kelas={kelas} />;
        }}
      </Query>
    );
  }
}

export default List;
export { MAHASISWA_BELUM_DI_KELAS };
