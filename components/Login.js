/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Link from 'next/link';
import { Form, Icon, Input, Button, Alert } from 'antd';
import PesanError from './PesanError';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;

class SigninComponent extends React.Component {
  state = {
    password: '',
    email: '',
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={() => Router.push('/')}
      >
        {(signup, { error, loading }) => (
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              await signup();
              this.setState({ email: '', password: '' });
            }}
            className="login-form"
            style={{ maxWidth: '100%' }}
          >
            {error && <PesanError error={error} />}
            <Form.Item>
              <Input
                disabled={loading}
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="email"
                name="email"
                required
                placeholder="email"
                value={this.state.email}
                onChange={this.saveToState}
              />
            </Form.Item>
            <Form.Item>
              <Input
                disabled={loading}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                name="password"
                required
                placeholder="password"
                value={this.state.password}
                onChange={this.saveToState}
              />
            </Form.Item>
            <Form.Item>
              <Link href="/foregetpassword">
                <a style={{ float: 'right' }}>Lupa password</a>
              </Link>

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SigninComponent;
