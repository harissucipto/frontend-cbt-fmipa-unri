import React, { Component } from 'react';
import { Card, Form, Input, Button, Icon } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../PesanError';

const UPDATE_PASSWORD = gql`
  mutation UPDATE_PASSWORD($password: String!) {
    updatePassword(password: $password) {
      id
      email
    }
  }
`;

class UpdatePassword extends Component {
  state = {
    password: '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_PASSWORD} variables={this.state}>
        {(updatePassword, { error, loading }) => (
          <Card
            title="Ganti Password"
            style={{ margin: '20px', padding: '24px', maxWidth: '480px' }}
          >
            <Form
              onSubmit={async (e) => {
                e.preventDefault();
                await updatePassword();
                this.setState({ password: '' });
              }}
            >
              {error && <PesanError error={error} />}
              <Form.Item>
                <Input
                  disabled={loading}
                  prefix={<Icon type="lock" />}
                  type="text"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                  required
                />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Rubah Password
              </Button>
            </Form>
          </Card>
        )}
      </Mutation>
    );
  }
}

export default UpdatePassword;
