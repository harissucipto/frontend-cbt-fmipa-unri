import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Select } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { Option } = Select;

const KUNCI_JAWABAN = ({
  loading, value, onChange, data,
}) => (
  <Select placeholder="Pilih Kunci Jawaban" loading={loading} value={value} onChange={onChange}>
    {data.map(item => (
      <Option key={item.key} value={item.key}>
        {item.key.toLowerCase()}
      </Option>
    ))}
  </Select>
);

export default KUNCI_JAWABAN;
