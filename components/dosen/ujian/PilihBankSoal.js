/* eslint-disable react/prop-types */
import React from 'react';
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
        id
      }
    }
  }
`;

const PILIH_MATA_KULIAH = ({ mataKuliah, value, onChange }) => (
  <Query
    query={DOSEN_LIST}
    variables={{
      mataKuliah,
    }}
    fetchPolicy="network-only"
  >
    {({ data, loading, error }) => (
      <Select
        placeholder="Pilih Bank Soal"
        loading={loading}
        value={value}
        onChange={(nilai) => {
          onChange(nilai);
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
    )}
  </Query>
);

export default PILIH_MATA_KULIAH;
