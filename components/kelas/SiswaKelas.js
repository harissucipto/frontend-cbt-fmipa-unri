/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';

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
];

class ListMahasiswa extends React.Component {
  render() {
    return (
      <Table
        columns={columns}
        loading={this.props.loading}
        dataSource={this.props.mahasiswa}
        rowKey={record => record.id}
      />
    );
  }
}

export default ListMahasiswa;
