import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

class Signup extends Component {
  state = {
    email: '',
    password: '',
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await signup();
              this.setState({ email: '', password: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Daftar Akun Baru</h2>
              <ErrorMessage error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
