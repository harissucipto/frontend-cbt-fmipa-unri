/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import flat from 'flat';
import { Table, Divider, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';

const ALL_MAHASISWA_QUERY = gql`
  query ALL_MAHASISWA_QUERY($skip: Int = 0, $first: Int = 5) {
    mahasiswas(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      nama
      nim
      id
      user {
        email
        passwordKasih
      }
    }
  }
`;

const columns = [
  {
    title: 'Nama',
    dataIndex: 'nama',
    key: 'nama',
    render: (text, record) => (
      <Link
        href={{
          pathname: '/mahasiswa/profil',
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
    title: 'Password Awal',
    dataIndex: 'user.passwordKasih',
    key: 'passwordKasih',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="ghost">Hapus</Button>

        <Divider type="vertical" />
      </span>
    ),
  },
];

const ListMahasiswa = () => (
  <Query query={ALL_MAHASISWA_QUERY}>
    {({ data, error, loading }) => {
      if (error) return <PesanError error={error} />;
      return (
        <Table
          columns={columns}
          loading={loading}
          dataSource={this.props.mahasiswa}
          rowKey={record => record.nim}
        />
      );
    }}
  </Query>
);

export { ALL_MAHASISWA_QUERY };

export default ListMahasiswa;
