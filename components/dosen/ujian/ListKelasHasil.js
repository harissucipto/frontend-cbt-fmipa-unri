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
        dataIndex: 'skor.nilai',
        key: 'skor',
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
