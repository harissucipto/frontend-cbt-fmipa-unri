import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Select } from 'antd';

const { Option } = Select;

const QUERY_GET_ANGKATAN = gql`
  query QUERY_GET_ANGKATAN {
    angkatans {
      id
      nama
    }
  }
`;

const RenderAngkatan = props => (
  <Query query={QUERY_GET_ANGKATAN}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error) console.log(error);
      console.log(data, 'ii');

      return <p>Render angaktan</p>;
    }}
  </Query>
);

export default RenderAngkatan;
