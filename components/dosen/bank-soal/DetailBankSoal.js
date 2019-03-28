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
          <p>Bank Soal: {data.bankSoal.nama}</p>
          <p>Mata Kuliah: {data.bankSoal.mataKuliah.nama}</p>
          <p>Jumlah Soal: {data.bankSoal.soals.length}</p>
          <p>Jumlah Tingkat Kesulitan Soal:</p>
          <ul>
            <li>
              Mudah :{' '}
              {!data.bankSoal.soals.length
                ? '0 Soal'
                : `${
                    data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'MUDAH').length
                  } Soal`}{' '}
            </li>
            <li>
              Sedang :{' '}
              {!data.bankSoal.soals.length
                ? '0 Soal'
                : `${
                    data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'SEDANG').length
                  } Soal`}{' '}
            </li>
            <li>
              Susah :{' '}
              {!data.bankSoal.soals.length
                ? '0 Soal'
                : `${
                    data.bankSoal.soals.filter(soal => soal.tingkatKesulitan === 'SUSAH').length
                  } Soal`}{' '}
            </li>
          </ul>
        </Card>
      );
    }}
  </Query>
);

export default DetailBankSoal;
