/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Hapus from './Hapus';

const SEARCH_LIST = gql`
  query SEARCH_LIST($searchTerm: String!, $jurusan: String!, $prodi: String!) {
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
      user {
        id
        email
        passwordKasih
      }
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

class List extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Nama ',
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
        title: 'Email',
        dataIndex: 'user.email',
        key: 'email',
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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              onClick={() =>
                Router.replace({ pathname: '/admin/mahasiswa/edit', query: { id: record.id } })
              }
              type="ghost"
            >
              Edit
            </Button>

            <Divider type="vertical" />

            <Hapus
              id={record.id}
              prodi={this.props.prodi}
              jurusan={this.props.jurusan}
              keyword={this.props.keyword}
            />
          </span>
        ),
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
                Total Akun: <b>{data.mahasiswas.length}</b> Mahasiswa
              </i>
              <Table
                bordered
                dataSource={data.mahasiswas}
                columns={this.columns}
                rowKey={record => record.nim}
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
