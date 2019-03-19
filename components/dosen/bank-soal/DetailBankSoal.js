import React from 'react';
import { Query } from 'react-apollo';
import { Card, Button } from 'antd';
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
          title="Detail Bank Soal"
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
          <p>Bank Soal: {data.bankSoal.nama}</p>
          <p>Mata Kuliah: {data.bankSoal.mataKuliah.nama}</p>
          <p>Jumlah Soal: {data.bankSoal.soals.length}</p>
        </Card>
      );
    }}
  </Query>
);

export default DetailBankSoal;
