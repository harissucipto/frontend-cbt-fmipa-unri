/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import moment from 'moment';
import 'moment/locale/id';

import Hapus from './Hapus';

const SEARCH_LIST = gql`
  query SEARCH_LIST($searchTerm: String!, $jurusan: String!, $prodi: String!) {
    ujiansMahasiswa(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
          { status: true }
        ]
      }
    ) {
      id
      nama
      tanggalPelaksanaan
      durasiPengerjaan
      dosen {
        id
        nama
      }
      prodi {
        id
        nama
        jurusan {
          id
          nama
        }
      }
      kelas {
        id
        nama
        mataKuliah {
          id
          nama
        }
      }
    }
  }
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'No.',
        key: 'nomor',
        render: (text, record, i) => <span>{i + 1}</span>,
      },
      {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
        render: (text, record) => (
          <Link
            href={{
              pathname: '/mahasiswa/ujian/profil',
              query: { id: record.id },
            }}
          >
            <a>{text}</a>
          </Link>
        ),
      },
      {
        title: 'Tanggal dilaksankan',
        dataIndex: 'tanggalPelaksanaan',
        key: 'pelaksanaan',
        render: (text, record) => (
          <p>{moment(record.tanggalPelaksanaan).format('dddd, Do MMMM  YYYY')}</p>
        ),
      },
      {
        title: 'Jam ',
        dataIndex: 'tanggalPelaksanaan',
        key: 'jam',
        render: (text, record) => <p>{moment(record.tanggalPelaksanaan).format('hh:mm:ss a')}</p>,
      },
      {
        title: 'Durasi Ujian ',
        dataIndex: 'durasi',
        key: 'durasi',
        render: (text, record) => <p>{record.durasiPengerjaan} menit</p>,
      },
      {
        title: 'Mata Kuliah',
        dataIndex: 'kelas.mataKuliah.nama',
        key: 'mataKuliah',
      },
      {
        title: 'Kelas',
        dataIndex: 'kelas.nama',
        key: 'kelas',
      },
      {
        title: 'Dosen',
        dataIndex: 'dosen.nama',
        key: 'dosen',
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
    ];
  }

  render() {
    const { prodi, jurusan, keyword } = this.props;
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
          console.log(data);
          return (
            <>
              <i style={{ marginLeft: '40px', marginBottom: '50px', display: 'inline-block' }}>
                Total Ujian: <b>{data.ujiansMahasiswa.length}</b>
              </i>
              <Table
                bordered
                dataSource={data.ujiansMahasiswa}
                columns={this.columns}
                rowKey={record => record.id}
                loading={loading}
              />
            </>
          );
        }}
      </Query>
    );
  }
}

export default List;
export { SEARCH_LIST };
