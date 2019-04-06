/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button, Popover } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class ListKelas extends Component {
  constructor(props) {
    super(props);

    const { soals } = this.props.bankSoal;
    console.log(soals, 'ini soals');

    this.columns = [
      {
        title: 'Peserta',
        children: [
          {
            title: 'Nama',
            key: 'nama',
            render: (text, record) => <span>{record.mahasiswa.nama}</span>,
          },
          {
            title: 'NIM',
            key: 'nim',
            render: (text, record) => <span>{record.mahasiswa.nim}</span>,
          },
        ],
      },

      {
        title: 'Soal',
        children: [
          ...soals.map((item, i) => ({
            title: (
              <Popover
                title="Detail Soal"
                content={
                  <div>
                    <p>id Soal: {item.id}</p>
                    <p>Tingkat Kesulitan: {item.tingkatKesulitan}</p>
                  </div>
                }
              >
                <Button
                  style={{
                    backgroundColor:
                      item.tingkatKesulitan === 'SUSAH'
                        ? 'danger'
                        : item.tingkatKesulitan === 'SEDANG'
                        ? 'orange'
                        : 'blue',
                  }}
                >
                  <span style={{ color: 'white' }}>{i + 1}</span>
                </Button>
              </Popover>
            ),

            key: item.id,
            width: 5,
            render: (text, record) =>
              (record.soals.find(soal => soal.id === item.id) ? (
                <Popover title="Iya">
                  <div style={{ backgroundColor: 'green', height: '10px' }} />
                </Popover>
              ) : (
                <div style={{ height: '10px' }} />
              )),
          })),
        ],
      },
    ];
  }

  render() {
    return (
      <Table
        bordered
        rowKey={record => record.mahasiswa.id}
        loading={this.props.loading}
        columns={this.columns}
        dataSource={this.props.soalMahasiswas}
        scroll={{ x: 1300 }}
      />
    );
  }
}

export default ListKelas;
