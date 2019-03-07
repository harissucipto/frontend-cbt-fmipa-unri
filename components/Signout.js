import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Button } from 'antd';
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
    onCompleted={() => Router.push('/')}
  >
    {signout => (
      <Button
        type="danger"
        icon="logout"
        style={{ display: 'inline-block', padding: '0 12px' }}
        size="small"
        onClick={signout}
      >
        signout
      </Button>
    )}
  </Mutation>
);

export default SignOut;
