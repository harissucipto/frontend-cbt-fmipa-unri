/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Divider, Button, Spin } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ListSoal from './ListSoal';
import Hapus from './Hapus';

const SEARCH_LIST = gql`
  query SEARCH_LIST($id: ID!) {
    bankSoals(where: { AND: [{ id: $id }] }) {
      id
      nama
      mataKuliah {
        id
        nama
      }
      dosen {
        id
        nama
      }
      prodi {
        id
        nama
        jurusan {
          id
          nama
        }
      }
      soals {
        id
        image
        pertanyaan
        jawaban {
          image
          id
          title
          content
        }
        kunciJawaban
        tingkatKesulitan
      }
    }
  }
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Nama Bank Soal',
        dataIndex: 'nama',
        key: 'nama',
        render: (text, record) => (
          <Link
            href={{
              pathname: '/dosen/bank-soal/profil',
              query: { id: record.id },
            }}
          >
            <a>{text}</a>
          </Link>
        ),
      },
      {
        title: 'Mata Kuliah',
        dataIndex: 'mataKuliah.nama',
        key: 'mataKuliah',
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
                Router.replace({ pathname: '/dosen/bank-soal/edit', query: { id: record.id } })
              }
              type="ghost"
            >
              Edit
            </Button>

            <Divider type="vertical" />

            <Hapus
              id={record.id}
              prodi={this.props.prodi}
              jurusan={this.props.jurusan}
              keyword={this.props.keyword}
            />
          </span>
        ),
      },
    ];
  }

  render() {
    const {
      id, pilihSoal, soalDipilih, pilihSemua, hapusSemua,
    } = this.props;
    if (!id) return <p>Silahkan pilih bank soal</p>;

    return (
      <Query
        query={SEARCH_LIST}
        variables={{
          id,
        }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error }) => {
          if (loading) return <Spin tip="loading..." />;
          const [bankSoal] = data.bankSoals;
          if (!bankSoal.soals.length) return <p>Belum Ada Soal</p>;

          const mapNomorSoal = soalDipilih.map(item => bankSoal.soals.findIndex(soal => soal.id === item) + 1);
          return (
            <>
              <i style={{ marginLeft: '40px', marginBottom: '50px', display: 'inline-block' }}>
                Total Soal: <b>{bankSoal.soals.length}</b>
              </i>
              <p>
                Jumlah Soal yang telah dipilih: <b>{soalDipilih.length} Soal</b>
              </p>
              <p>
                Nomor Soal yang dipilih:{' '}
                <b>
                  {soalDipilih.length
                    ? mapNomorSoal.map(item => (
                      <span>
                        {item} {'  '}
                      </span>
                      ))
                    : 'Belum Ada'}
                </b>
              </p>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    const idSoals = bankSoal.soals.map(soal => soal.id);
                    pilihSemua(idSoals);
                  }}
                >
                  Pilih Semua
                </Button>
                <Button type="danger" onClick={hapusSemua}>
                  Hapus Pilihan
                </Button>
              </div>

              <div
                style={{
                  overflow: 'auto',
                  background: 'ivory',
                  height: '30rem',
                }}
              >
                <ListSoal
                  pilihSoal={pilihSoal}
                  soalDipilih={soalDipilih}
                  soals={bankSoal.soals}
                  bankSoal={bankSoal.id}
                  loading={loading}
                  idDosen={bankSoal.id}
                />
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

export default List;
export { SEARCH_LIST };
