/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import flat from 'flat';
import { Table, Divider, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';
import DeleteKelas from './DeleteKelas';

const ALL_KELAS_QUERY = gql`
  query ALL_KELAS_QUERY($skip: Int = 0, $first: Int = 5) {
    kelases(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      nama
      mataKuliah {
        nama
      }
      tahunAjaran
    }
  }
`;

const columns = [
  {
    title: 'Nama Kelas',
    dataIndex: 'nama',
    key: 'nama',
    render: (text, record) => (
      <Link
        href={{
          pathname: '/kelas/profil',
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
    title: 'Tahun Ajaran',
    dataIndex: 'tahunAjaran',
    key: 'tahunAjaran',
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          onClick={() => Router.push({ pathname: '/kelas/edit', query: { id: record.id } })}
          type="ghost"
        >
          Edit
        </Button>

        <Divider type="vertical" />
        <DeleteKelas id={record.id} />
      </span>
    ),
  },
];

const ListKelas = () => (
  <Query query={ALL_KELAS_QUERY}>
    {({ data, error, loading }) => {
      if (error) return <PesanError error={error} />;
      return (
        <Table
          columns={columns}
          loading={loading}
          dataSource={data.kelases.map(flat)}
          rowKey={record => record.id}
        />
      );
    }}
  </Query>
);

export { ALL_KELAS_QUERY };

export default ListKelas;
