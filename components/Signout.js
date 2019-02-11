import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const SignOut = () => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[
      {
        query: CURRENT_USER_QUERY,
      },
    ]}
    onCompleted={() => Router.push('/signin')}
  >
    {signout => <button onClick={signout}>Sign Out</button>}
  </Mutation>
);

export default SignOut;
