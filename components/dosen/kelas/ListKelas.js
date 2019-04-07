/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Avatar } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class ListKelas extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Nomor',
        key: 'nomor',
        width: 20,
        render: (text, record, i) => <p>{i + 1}</p>,
      },
      {
        title: 'Foto',
        key: 'image',
        width: 110,
        render: (text, record, i) => <Avatar shape="square" size={100} src={record.image} />,
      },
      {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
      },
      {
        title: 'NIM',
        dataIndex: 'nim',
        key: 'dosen',
      },
    ];
  }

  render() {
    return (
      <Table
        bordered
        columns={this.columns}
        pagination={false}
        dataSource={this.props.mahasiswas}
        rowKey={record => record.nim}
        loading={this.props.loading}
      />
    );
  }
}

export default ListKelas;
