/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import flat from 'flat';
import { Table, Divider, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';
import DeleteMataKuliah from './DeleteMataKuliah';

const ALL_MATAKULIAH_QUERY = gql`
  query ALL_MATAKULIAH_QUERY($skip: Int = 0, $first: Int = 5) {
    mataKuliahs(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      nama
      kode
      id
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
          pathname: '/matakuliah/profil',
          query: { id: record.id },
        }}
      >
        <a>{text}</a>
      </Link>
    ),
  },

  {
    title: 'Kode',
    dataIndex: 'kode',
    key: 'kode',
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          onClick={() => Router.push({ pathname: '/matakuliah/edit', query: { id: record.id } })}
          type="ghost"
        >
          Edit
        </Button>

        <Divider type="vertical" />
        <DeleteMataKuliah id={record.id} />
      </span>
    ),
  },
];

const ListMataKuliah = () => (
  <Query query={ALL_MATAKULIAH_QUERY}>
    {({ data, error, loading }) => {
      if (error) return <PesanError error={error} />;
      return (
        <Table
          columns={columns}
          loading={loading}
          dataSource={data.mataKuliahs}
          rowKey={record => record.id}
        />
      );
    }}
  </Query>
);

export { ALL_MATAKULIAH_QUERY };

export default ListMataKuliah;
