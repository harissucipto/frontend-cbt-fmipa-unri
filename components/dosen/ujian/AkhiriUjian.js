import React from 'react';
import { Button, Popconfirm, Icon, message, Spin } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { SEARCH_LIST } from './List';

const CREATE_SKOR = gql`
  mutation CREATE_SKOR($idUjian: ID!) {
    akhiriUjianDosen(idUjian: $idUjian) {
      id
      soalMahasiswas {
        id
        skor
      }
    }
  }
`;

const TampilkanSoal = props => (
  <Mutation
    mutation={CREATE_SKOR}
    variables={{ idUjian: props.idUjian }}
    refetchQueries={[
      {
        query: SEARCH_LIST,
        variables: {
          searchTerm: this.props.keyword,
          jurusan: this.props.jurusan,
          prodi: this.props.prodi,
        },
      },
    ]}
  >
    {(akhiri, { error, loading, data }) => {
      if (loading) return <Spin />;

      return (
        <Popconfirm
          title="Anda ingin mengakhiri ujian？"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
          onConfirm={async () => {
            await akhiri().catch(() => message.error('Koneksi gangguan, Coba Lagi!'));
          }}
        >
          <Button type="dashed">Akhiri Ujian</Button>
        </Popconfirm>
      );
    }}
  </Mutation>
);

export default TampilkanSoal;
