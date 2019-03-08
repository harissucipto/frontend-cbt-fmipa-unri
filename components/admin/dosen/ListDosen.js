/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import flat from 'flat';
import { Table, Divider, Button } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      </span>
    ),
  },
];

const ListDosen = ({ dosens }) => (
  <Table
    columns={columns}
    dataSource={dosens}
    rowKey={record => record.nip}
    loading={this.props.loading}
  />
);

export default ListDosen;
