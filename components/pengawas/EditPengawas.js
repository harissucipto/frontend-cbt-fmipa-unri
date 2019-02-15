import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Card, Avatar, Form, Alert, Input, Button } from 'antd';
import PesanError from '../PesanError';

const PENGAWAS_QUERY = gql`
  query PENGAWAS_QUERY($id: ID!) {
    pengawas(id: $id) {
      nama
      id
      user {
        email
        passwordKasih
        permissions
      }
    }
  }
`;

const PENGAWAS_UPDATE_QUERY = gql`
  mutation PENGAWAS_UPDATE_QUERY($user: UserInput, $pengawas: PengawasBaruInput, $id: ID!) {
    updatePengawas(user: $user, pengawas: $pengawas, id: $id) {
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

class FormEditpengawas extends React.Component {
  static propTypes = {
    pengawas: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      user: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  state = {
    email: this.props.pengawas.user.email || '',
    nama: this.props.pengawas.nama || '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={PENGAWAS_UPDATE_QUERY}
        variables={{
          user: {
            email: this.state.email,
          },
          pengawas: {
            nama: this.state.nama,
          },
          id: this.props.pengawas.id,
        }}
        refetchQueries={[{ query: PENGAWAS_QUERY, variables: { id: this.props.pengawas.id } }]}
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

            <Button type="primary" htmlType="submit" loading={loading}>
              Update Informasi
            </Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

const ProfilPengawas = props => (
  <Query
    query={PENGAWAS_QUERY}
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
                  <h2>{data.pengawas.nama}</h2>
                  <p>
                    {data.pengawas.user.permissions
                      .filter(permission => !['USER'].includes(permission))
                      .join(' ')}{' '}
                    CBT FMIPA UR
                  </p>
                </div>
              </HeaderAvatar>

              <FormEditpengawas pengawas={data.pengawas} />
            </>
          )}
        </Card>
      );
    }}
  </Query>
);

ProfilPengawas.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilPengawas;
