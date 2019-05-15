/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Card, List, Avatar, Button, Popover, Row, Col, Tag } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { ConvertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const nomorSoal = bankSoal => idCari => bankSoal.findIndex(soal => soal.id === idCari) + 1;

class ListKelas extends Component {
  constructor(props) {
    super(props);
    this.columns = () => [
      {
        title: 'Nama',
        height: 50,
        render: (text, record) => <div>{record.mahasiswa.nama}</div>,
      },
      {
        title: 'NIM',
        height: 50,
        render: (text, record) => <div>{record.mahasiswa.nim}</div>,
      },
      {
        title: 'Hasil Pengacakan Soal Ujian',
        render: (text, record) => <div>{record.urutan}</div>,
      },
    ];
  }

  render() {
    const { mahasiswas } = this.props;
    console.log(mahasiswas);
    return (
      <div>
        <Table
          bordered
          rowKey={record => record.mahasiswa.id}
          loading={this.props.loading}
          columns={this.columns()}
          dataSource={mahasiswas}
        />
      </div>
    );
  }
}

export default ListKelas;
