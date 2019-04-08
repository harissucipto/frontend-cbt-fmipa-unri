/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Card, List, Avatar, Button, Popover } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class ListKelas extends Component {
  constructor(props) {
    super(props);

    const { soals } = this.props.bankSoal;
    console.log(soals, 'ini soals');

    this.columns = [
      {
        title: 'Peserta Ujian',
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
                        ? 'red'
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
      <div>
        <Card title="Hasil Generate Soal" style={{ marginBottom: '15px' }}>
          <List xs={24} md={24}>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="setting" style={{ backgroundColor: 'blue' }} />}
                title={<a>Kesulitan Mudah</a>}
                description={`${
                  this.props.soalMahasiswas[0].soals.filter(item => item.tingkatKesulitan === 'MUDAH').length
                } soal`}
              />
              <List.Item.Meta
                avatar={<Avatar icon="setting" style={{ backgroundColor: 'orange' }} />}
                title={<a>Kesulitan Sedang</a>}
                description={`${
                  this.props.soalMahasiswas[0].soals.filter(item => item.tingkatKesulitan === 'SEDANG').length
                } soal`}
              />
              <List.Item.Meta
                avatar={<Avatar icon="setting" style={{ backgroundColor: 'red' }} />}
                title={<a>Kesulitan Susah</a>}
                description={`${
                  this.props.soalMahasiswas[0].soals.filter(item => item.tingkatKesulitan === 'SUSAH').length
                } soal`}
              />
            </List.Item>
          </List>
        </Card>
        <Table
          bordered
          rowKey={record => record.mahasiswa.id}
          loading={this.props.loading}
          columns={this.columns}
          dataSource={this.props.soalMahasiswas}
          scroll={{ x: 1300 }}
        />
      </div>
    );
  }
}

export default ListKelas;
