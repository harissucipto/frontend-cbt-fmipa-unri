import React from 'react';
import { Query } from 'react-apollo';
import { Card, Button, List, Avatar } from 'antd';
import Router from 'next/router';

import { CURRENT_QUERY } from './Profil';

const DetailBankSoal = props => (
  <Query query={CURRENT_QUERY} variables={{ id: props.id }} fetchPolicy="network-only">
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data) return <p>Loading..</p>;
      console.log(data, 'data profil');

      return (
        <Card
          title="Detail Bank Soal Sekarang"
          loading={loading}
          extra={
            <Button
              type="primary"
              onClick={() => Router.push(`/dosen/bank-soal/profil?id=${props.id}`)}
            >
              Lihat Daftar Soal
            </Button>
          }
        >
          <List>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="file-text" />}
                title={<a>Nama Bank Soal</a>}
                description={data.bankSoal.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="mail" />}
                title={<a> Mata Kuliah</a>}
                description={data.bankSoal.mataKuliah.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" />}
                title={<a>Jumlah Soal</a>}
                description={data.bankSoal.soals.length}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="setting" />}
                title={<a>Jumlah soal tingkat kesulitan mudah</a>}
                description={
                  !data.bankSoal.soals.length
                    ? '0 Soal'
                    : `${
                        data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'MUDAH').length
                      } Soal`
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="setting" />}
                title={<a>Jumlah soal tingkat kesulitan sedang</a>}
                description={
                  !data.bankSoal.soals.length
                    ? 0
                    : `${
                        data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'SEDANG')
                          .length
                      } soal`
                }
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="setting" />}
                title={<a>Jumlah soal tingkat kesulitan susah</a>}
                description={
                  !data.bankSoal.soals.length
                    ? 0
                    : `${
                        data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'SUSAH').length
                      } soal`
                }
              />
            </List.Item>
          </List>
        </Card>
      );
    }}
  </Query>
);

export default DetailBankSoal;
