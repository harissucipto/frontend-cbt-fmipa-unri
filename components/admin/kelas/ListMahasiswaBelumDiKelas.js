/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button, Input, Checkbox } from 'antd';
import gql from 'graphql-tag';
import { Query, ApolloConsumer } from 'react-apollo';

import { SEARCH_LIST } from '../mahasiswa/List';

const MUTATAION_TAMBAH_KELAS_MAHASISWA = gql`
  mutation MUTATAION_UPDATE_MAHASISWA($mahasiswa: ID!, $kelas: ID!) {
    updateMahasiswa(where: { id: $mahasiswa }, data: { kelases: { connect: { id: $kelas } } }) {
      id
      nama
    }
  }
`;

const MUTATAION_DELETE_KELAS_MAHASISWA = gql`
  mutation MUTATAION_UPDATE_MAHASISWA($mahasiswa: ID!, $kelas: ID!) {
    updateMahasiswa(where: { id: $mahasiswa }, data: { kelases: { disconnect: { id: $kelas } } }) {
      id
      nama
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
          <ApolloConsumer>
            {client => (
              <Checkbox
                checked={record.kelases}
                onChange={() => this.toggleCheckbox(record.id, client)}
              />
            )}
          </ApolloConsumer>
        ),
      },
    ];

    const kelasIni = this.props.kelas;
    console.log(kelasIni, '-ini kelas');

    const dataMahasiswa = this.props.mahasiswas ? this.props.mahasiswas : [];

    // map mahasiswa yang ada di kelas
    const mahasiswas = this.mappingDataMahasiswa(dataMahasiswa, kelasIni);

    console.log(mahasiswas, 'ini data mahasiswas yang telah di map');

    this.state = {
      mahasiswas,
      kelas: kelasIni,
      loading: false,
    };
  }

  mappingDataMahasiswa = (mahasiswas = [], bandingkanKelas) =>
    (!mahasiswas.length
      ? []
      : mahasiswas.map(mahasiswa => ({
        ...mahasiswa,
        kelases: mahasiswa.kelases.length
          ? !!mahasiswa.kelases
            .filter(kelas => kelas.id === bandingkanKelas)
            .map(kelas => kelas.id)[0]
          : false,
      })));

  toggleCheckbox = async (id, client) => {
    const sudah = false;
    let kondisiMahasiswa = false;
    this.setState({ loading: true });
    const newMahasiswa = this.state.mahasiswas.map((mahasiswa) => {
      if (mahasiswa.id === id) {
        const rubahMahasiswa = {
          ...mahasiswa,
          kelases: !mahasiswa.kelases,
        };

        if (rubahMahasiswa.kelases) {
          kondisiMahasiswa = true;
        }

        return rubahMahasiswa;
      } else {
        return mahasiswa;
      }
    });

    if (kondisiMahasiswa) {
      await client.mutate({
        mutation: MUTATAION_TAMBAH_KELAS_MAHASISWA,
        variables: {
          mahasiswa: id,
          kelas: this.state.kelas,
        },
      });
    } else {
      await client.mutate({
        mutation: MUTATAION_DELETE_KELAS_MAHASISWA,
        variables: {
          mahasiswa: id,
          kelas: this.state.kelas,
        },
      });
    }

    this.setState({ mahasiswas: newMahasiswa, loading: false });
  };

  render() {
    return (
      <Table
        dataSource={this.state.mahasiswas}
        columns={this.columns}
        rowKey={record => record.nim}
        loading={this.props.loading || this.state.loading}
      />
    );
  }
}

class List extends Component {
  render() {
    const {
      prodi, jurusan, keyword, kelas,
    } = this.props;

    console.log(keyword, 'ini props keyword');
    return (
      <Query
        query={SEARCH_LIST}
        variables={{
          searchTerm: keyword,
          jurusan,
          prodi,
        }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error }) => {
          console.log(data, 'ini data oy');
          if (loading) return <p>oading</p>;

          if (!data) return <p>kkkk</p>;
          return (
            <EditMahasiswa
              mahasiswas={data.mahasiswas}
              loading={loading}
              kelas={kelas}
              prodi=""
              jurusan=""
            />
          );
        }}
      </Query>
    );
  }
}

export default List;
export { MAHASISWA_BELUM_DI_KELAS, MUTATAION_DELETE_KELAS_MAHASISWA };
