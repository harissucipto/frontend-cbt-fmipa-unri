/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class ListKelas extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'No.',
        key: 'nomor',
        render: (text, record, i) => <span>{i + 1}</span>,
      },
      {
        title: 'Nama',
        dataIndex: 'mahasiswa.nama',
        key: 'nama',
        render: (text, record) => <span>{text}</span>,
      },
      {
        title: 'NIM',
        dataIndex: 'mahasiswa.nim',
        key: 'nim',
      },
      {
        title: 'Skor Ujian',
        key: 'skor',
        render: (text, record, i) => (
          <Link
            href={{
              pathname: '/dosen/ujian/detail-hasil',
              query: { id: this.props.idUjian, mahasiswa: record.mahasiswa.id },
            }}
          >
            <a>{record.skor}</a>
          </Link>
        ),
      },
    ];
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.mahasiswas}
        rowKey={record => record.id}
        loading={this.props.loading}
      />
    );
  }
}

export default ListKelas;
