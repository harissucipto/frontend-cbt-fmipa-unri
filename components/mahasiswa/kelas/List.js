/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SEARCH_LIST = gql`
  query SEARCH_LIST($searchTerm: String!, $jurusan: String!, $prodi: String!) {
    kelasesMahasiswa(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
        ]
      }
    ) {
      id
      nama
      mataKuliah {
        id
        nama
      }
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
              pathname: '/mahasiswa/kelas/profil',
              query: { id: record.id },
            }}
          >
            <a>{text}</a>
          </Link>
        ),
      },
      {
        title: 'Mata Kuliah',
        dataIndex: 'mataKuliah.nama',
        key: 'mataKuliah',
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
                Total Kelas: <b>{data.kelasesMahasiswa.length}</b> Kelas
              </i>
              <Table
                dataSource={data.kelasesMahasiswa}
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
