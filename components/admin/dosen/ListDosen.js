/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import Hapus from './Hapus';

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
        title: 'Password Awal',
        dataIndex: 'user.passwordKasih',
        key: 'passwordKasih',
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

            <Hapus id={record.id} hapusDataTampilan={() => this.props.hapusDosen(record.id)} />
          </span>
        ),
      },
    ];
  }

  render() {
    console.log(this.props.dosens);
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.dosens}
        rowKey={record => record.nip}
        loading={this.props.loading}
      />
    );
  }
}

export default ListDosen;
