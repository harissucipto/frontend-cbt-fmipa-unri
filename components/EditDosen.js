import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Card, Avatar, Form, Alert, Input, Button } from 'antd';
import PesanError from './PesanError';

const DOSEN_QUERY = gql`
  query DOSEN_QUERY($id: ID!) {
    dosen(id: $id) {
      nama
      nip
      id
      user {
        email
        passwordKasih
        permissions
      }
    }
  }
`;

const UPDATE_DOSEN_MUTATION = gql`
  mutation UPDATE_DOSEN_MUTATION($user: UserInput, $dosen: DosenBaruInput, $id: ID!) {
    updateDosen(user: $user, dosen: $dosen, id: $id) {
      id
      email
    }
  }
`;

const HeaderAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  div {
    margin-top: 20px;
    text-align: center;
    h2 {
      margin-bottom: 4px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
`;

class FormEditDosen extends React.Component {
  static propTypes = {
    dosen: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nip: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      user: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  state = {
    email: this.props.dosen.user.email || '',
    nama: this.props.dosen.nama || '',
    nip: this.props.dosen.nip || '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_DOSEN_MUTATION}
        variables={{
          user: {
            email: this.state.email,
          },
          dosen: {
            nama: this.state.nama,
            nip: this.state.nip,
          },
          id: this.props.dosen.id,
        }}
        refetchQueries={[{ query: DOSEN_QUERY, variables: { id: this.props.dosen.id } }]}
      >
        {(updateAkun, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              await updateAkun();
            }}
          >
            <PesanError error={error} />
            {!error && !loading && called && (
              <Alert
                message="Update Informasi Akun Berhasil"
                type="success"
                showIcon
                style={{ margin: '10px 0' }}
              />
            )}
            <Form.Item label="E-mail" disabled={loading}>
              <Input
                disabled={loading}
                value={this.state.email}
                onChange={this.saveToState}
                name="email"
                type="email"
                required
              />
            </Form.Item>

            <Form.Item label="Nama">
              <Input
                disabled={loading}
                onChange={this.saveToState}
                value={this.state.nama}
                name="nama"
                type="string"
                required
              />
            </Form.Item>

            <Form.Item label="Nip">
              <Input
                disabled={loading}
                onChange={this.saveToState}
                value={this.state.nip}
                name="nip"
                type="string"
                required
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Update Informasi
            </Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

const ProfilDosen = props => (
  <Query
    query={DOSEN_QUERY}
    variables={{
      id: props.id,
    }}
  >
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>;
      if (error) {
        return (
          <div style={{ margin: '40px' }}>
            <PesanError error={error} />
          </div>
        );
      }

      return (
        <Card style={{ margin: '20px', padding: '24px' }} loading={loading}>
          {data && (
            <>
              <HeaderAvatar>
                <Avatar size={144} icon="user" />
                <div>
                  <h2>{data.dosen.nama}</h2>
                  <p>
                    {data.dosen.user.permissions
                      .filter(permission => !['USER'].includes(permission))
                      .join(' ')}{' '}
                    CBT FMIPA UR
                  </p>
                </div>
              </HeaderAvatar>

              <FormEditDosen dosen={data.dosen} />
            </>
          )}
        </Card>
      );
    }}
  </Query>
);

ProfilDosen.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilDosen;
