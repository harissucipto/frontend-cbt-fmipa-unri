import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Select } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { Option } = Select;

const DOSEN_LIST = gql`
  query DOSEN_LIST($searchTerm: String, $jurusan: String, $prodi: String) {
    kelases(
      where: {
        AND: [
          { OR: [{ nama_contains: $searchTerm }] }
          { prodi: { nama_contains: $prodi, jurusan: { nama_contains: $jurusan } } }
        ]
      }
    ) {
      id
      nama
      mataKuliah {
        id
        nama
      }
    }
  }
`;

const PILIH_MATA_KULIAH = ({
  prodi, jurusan, value, onChange,
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
        <Select placeholder="Pilih Kelas" loading={loading} value={value} onChange={onChange}>
          {data.kelases
            ? data.kelases.map(item => (
              <Option
                key={item.id}
                value={{
                    kelas: item.id,
                    tampilkanNilai: `${item.nama} ${item.mataKuliah.nama}`,
                    mataKuliah: item.mataKuliah.id,
                  }}
              >
                {item.nama} {item.mataKuliah.nama}
              </Option>
              ))
            : null}
        </Select>
      );
    }}
  </Query>
);

export default PILIH_MATA_KULIAH;
