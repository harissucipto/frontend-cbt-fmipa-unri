/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import flat from 'flat';
import { Table, Divider, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PesanError from '../PesanError';
import DeletePengawas from './DeletePengawas';

const ALL_PENGAWAS_QUERY = gql`
  query ALL_PENGAWAS_QUERY($skip: Int = 0, $first: Int = 5) {
    pengawass(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      nama
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
          pathname: '/pengawas/profil',
          query: { id: record.id },
        }}
      >
        <a>{text}</a>
      </Link>
    ),
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
          onClick={() => Router.push({ pathname: '/pengawas/edit', query: { id: record.id } })}
          type="ghost"
        >
          Edit
        </Button>

        <Divider type="vertical" />
        <DeletePengawas id={record.id} />
      </span>
    ),
  },
];

const ListPengawas = () => (
  <Query query={ALL_PENGAWAS_QUERY}>
    {({ data, error, loading }) => {
      if (error) return <PesanError error={error} />;
      return (
        <Table
          columns={columns}
          loading={loading}
          dataSource={data.pengawass.map(flat)}
          rowKey={record => record.id}
        />
      );
    }}
  </Query>
);

export { ALL_PENGAWAS_QUERY };

export default ListPengawas;
