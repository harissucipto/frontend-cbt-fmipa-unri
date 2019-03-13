import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Select } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { Option } = Select;

const DOSEN_LIST = gql`
  query DOSEN_LIST($searchTerm: String, $jurusan: String, $prodi: String) {
    dosens(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
        ]
      }
    ) {
      id
      nama
      nip
    }
  }
`;

const PILIH_DOSEN = ({ dosenIni, rubahState }) => (
  <Query
    query={DOSEN_LIST}
    variables={{
      searchTerm: '',
      jurusan: '',
      prodi: '',
    }}
    fetchPolicy="network-only"
  >
    {({ data, loading, error }) => (
      <Select
        placeholder="Pilih Dosen Pengajar"
        loading={loading}
        value={dosenIni}
        onChange={rubahState}
      >
        {data.dosens
          ? data.dosens.map(dosen => (
            <Option key={dosen.id} value={dosen.id}>
              {dosen.nama}
            </Option>
            ))
          : null}
      </Select>
    )}
  </Query>
);

export default PILIH_DOSEN;
