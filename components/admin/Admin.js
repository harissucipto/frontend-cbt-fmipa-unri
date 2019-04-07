import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_ADMIN_QUERY = gql`
  query {
    admin {
      id
      email
      admin {
        id
        nama
        image
      }
      permissions
    }
  }
`;

const ProfilAdmin = props => (
  <Query {...props} query={CURRENT_ADMIN_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

export default ProfilAdmin;
export { CURRENT_ADMIN_QUERY };
