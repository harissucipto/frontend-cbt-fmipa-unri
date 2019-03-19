/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import HapusSoal from './HapusSoal';

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
        render: (text, record) =>
          record.jawaban.map(item => (
            <p key={item.id}>
              {item.title}. {item.content}
            </p>
          )),
      },
      {
        title: 'Kunci Jawaban',
        dataIndex: 'kunciJawaban',
        key: 'kunciJawaban',
      },
      {
        title: 'Tingkat Kesulitan',
        dataIndex: 'tingkatKesulitan',
        key: 'tingkatKesulitan',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              onClick={() =>
                Router.replace({ pathname: '/dosen/bank-soal/edit-soal', query: { id: record.id } })
              }
              type="ghost"
            >
              Edit
            </Button>

            <Divider type="vertical" />

            <HapusSoal id={record.id} bankSoal={this.props.bankSoal} />
          </span>
        ),
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
