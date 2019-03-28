import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Select } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { Option } = Select;

const TINGKAT_KESULITAN = ['MUDAH', 'SEDANG', 'SUSAH'];

const PILIH_MATA_KULIAH = ({ loading, value, onChange }) => (
  <Select placeholder="Tingkat kesulitan soal" loading={loading} value={value} onChange={onChange}>
    {TINGKAT_KESULITAN.map(tingkatKesulitan => (
      <Option key={tingkatKesulitan} value={tingkatKesulitan}>
        {tingkatKesulitan.toLowerCase()}
      </Option>
    ))}
  </Select>
);

export default PILIH_MATA_KULIAH;
