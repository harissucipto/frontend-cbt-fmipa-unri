/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { Query } from 'react-apollo';
import { Card, Button, List, Avatar } from 'antd';
import Router from 'next/router';

import { CURRENT_QUERY } from './Profil';

const DetailBankSoal = props => (
  <Query query={CURRENT_QUERY} variables={{ id: props.id }} fetchPolicy="network-only">
    {({ data, loading }) => {
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
                avatar={<Avatar icon="file-text" style={{ backgroundColor: 'maroon' }} />}
                title={<a>Nama Bank Soal</a>}
                description={data.bankSoal.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" style={{ backgroundColor: 'brown' }} />}
                title={<a> Mata Kuliah</a>}
                description={data.bankSoal.mataKuliah.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" style={{ backgroundColor: 'olive' }} />}
                title={<a>Jumlah Soal</a>}
                description={data.bankSoal.soals.length || '0 Soal'}
              />
            </List.Item>
          </List>
        </Card>
      );
    }}
  </Query>
);

export default DetailBankSoal;
