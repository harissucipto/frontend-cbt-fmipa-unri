/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Hapus from './Hapus';

const SEARCH_DOSEN_QUERY1 = gql`
  query SEARCH_DOSEN_QUERY($searchTerm: String!, $jurusan: String!, $prodi: String!) {
    dosens(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }, { nip_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
        ]
      }
    ) {
      id
      nama
      nip
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
    }
  }
`;

class ListDosen extends Component {
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
              pathname: '/admin/dosen/profil',
              query: { id: record.id },
            }}
          >
            <a>{text}</a>
          </Link>
        ),
      },
      {
        title: 'NIP',
        dataIndex: 'nip',
        key: 'nip',
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
                Router.replace({ pathname: '/admin/dosen/edit', query: { id: record.id } })
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
        query={SEARCH_DOSEN_QUERY1}
        variables={{
          searchTerm: keyword,
          jurusan,
          prodi,
        }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error }) => (
          <>
            <i style={{ marginLeft: '40px', marginBottom: '50px', display: 'inline-block' }}>
              Total Akun: <b>{data.dosens.length}</b> Dosen
            </i>
            <Table
              bordered
              columns={this.columns}
              dataSource={data.dosens}
              rowKey={record => record.nip}
              loading={loading}
            />
          </>
        )}
      </Query>
    );
  }
}

export default ListDosen;
export { SEARCH_DOSEN_QUERY1 };
