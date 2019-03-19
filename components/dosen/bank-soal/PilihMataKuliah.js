import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Select } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { Option } = Select;

const DOSEN_LIST = gql`
  query DOSEN_LIST($searchTerm: String, $jurusan: String, $prodi: String) {
    mataKuliahs(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
        ]
      }
    ) {
      id
      nama
      kode
    }
  }
`;

const PILIH_MATA_KULIAH = ({
  prodi, jurusan, mataKuliahIni, rubahState,
}) => (
  <Query
    query={DOSEN_LIST}
    variables={{
      searchTerm: '',
      jurusan,
      prodi,
    }}
    fetchPolicy="network-only"
  >
    {({ data, loading, error }) => {
      console.log(data);

      return (
        <Select
          placeholder="Pilih Mata Kuliah"
          loading={loading}
          value={mataKuliahIni}
          onChange={rubahState}
        >
          {data.mataKuliahs
            ? data.mataKuliahs.map(mataKuliah => (
              <Option key={mataKuliah.id} value={mataKuliah.id}>
                {mataKuliah.nama}
              </Option>
              ))
            : null}
        </Select>
      );
    }}
  </Query>
);

export default PILIH_MATA_KULIAH;
