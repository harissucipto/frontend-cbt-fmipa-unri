/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import flat from 'flat';
import { Table, Divider, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from './PesanError';
import DeleteDosen from './DeleteDosen';

const ALL_DOSEN_QUERY = gql`
  query ALL_DOSEN_QUERY($skip: Int = 0, $first: Int = 5) {
    dosens(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      nama
      nip
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
          pathname: '/dosen/profil',
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
    title: 'Password Awal',
    dataIndex: 'user.passwordKasih',
    key: 'passwordKasih',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          onClick={() => Router.push({ pathname: '/dosen/edit', query: { id: record.id } })}
          type="ghost"
        >
          Edit
        </Button>

        <Divider type="vertical" />
        <DeleteDosen id={record.id} />
      </span>
    ),
  },
];

const ListDosen = () => (
  <Query query={ALL_DOSEN_QUERY}>
    {({ data, error, loading }) => {
      if (error) return <PesanError error={error} />;
      return (
        <Table
          columns={columns}
          loading={loading}
          dataSource={data.dosens.map(flat)}
          rowKey={record => record.nip}
        />
      );
    }}
  </Query>
);

export { ALL_DOSEN_QUERY };

export default ListDosen;
