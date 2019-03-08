import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const DOSENS_QUERY = gql`
  query {
    dosens {
      id
      nama
      nip
      user {
        id
        email
        passwordKasih
      }
    }
  }
`;

const GetDosen = props => (
  <Query {...props} query={DOSENS_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

export default GetDosen;
export { DOSENS_QUERY };
