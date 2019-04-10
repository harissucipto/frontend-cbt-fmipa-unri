/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button, Avatar } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class ListKelas extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'No.',
        key: 'no',
        width: 10,
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
        render: (text, record) => <span>{text}</span>,
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
        columns={this.columns}
        dataSource={this.props.mahasiswas}
        rowKey={record => record.nim}
        loading={this.props.loading}
      />
    );
  }
}

export default ListKelas;
