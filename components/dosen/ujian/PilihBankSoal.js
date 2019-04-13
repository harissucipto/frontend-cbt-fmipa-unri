import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Select } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { Option } = Select;

const DOSEN_LIST = gql`
  query DOSEN_LIST($mataKuliah: ID) {
    bankSoals(where: { AND: [{ mataKuliah: { id: $mataKuliah } }] }) {
      id
      nama
      mataKuliah {
        id
        nama
      }
      soals {
        tingkatKesulitan
      }
    }
  }
`;

const PILIH_MATA_KULIAH = ({
  mataKuliah, value, onChange, setSoal,
}) => (
  <Query
    query={DOSEN_LIST}
    variables={{
      mataKuliah,
    }}
    fetchPolicy="network-only"
  >
    {({ data, loading, error }) => {
      console.log(data);

      return (
        <Select
          placeholder="Pilih Bank Soal"
          loading={loading}
          value={value}
          onChange={(value) => {
            onChange(value);
            setSoal(data.bankSoals.filter(item => item.id === value)[0].soals);
          }}
        >
          {data.bankSoals
            ? data.bankSoals.map(item => (
              <Option key={item.id} value={item.id}>
                {item.nama}
              </Option>
              ))
            : null}
        </Select>
      );
    }}
  </Query>
);

export default PILIH_MATA_KULIAH;
