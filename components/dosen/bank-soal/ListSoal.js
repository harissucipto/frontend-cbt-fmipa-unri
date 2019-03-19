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
        title: 'Pertanyaan',
        dataIndex: 'pertanyaan',
        key: 'pertanyaan',
        render: (text, record) => (
          <Link
            href={{
              pathname: '/admin/mahasiswa/profil',
              query: { id: record.id },
            }}
          >
            <a>{text}</a>
          </Link>
        ),
      },
      {
        title: 'Jawaban',
        dataIndex: 'pilihanJawab',
        key: 'pilihanJawab',
      },
      {
        title: 'Kunci Jawaban',
        dataIndex: 'kunciJawaban',
        key: 'kunciJawaban',
      },
    ];
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.soals}
        rowKey={record => record.nim}
        loading={this.props.loading}
      />
    );
  }
}

export default ListKelas;
