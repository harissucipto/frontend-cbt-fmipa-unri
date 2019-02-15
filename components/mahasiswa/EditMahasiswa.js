import React from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Card, Avatar, Form, Alert, Input, Button } from 'antd';
import PesanError from '../PesanError';

const MAHASISWA_QUERY = gql`
  query MAHASISWA_QUERY($id: ID!) {
    mahasiswa(id: $id) {
      nama
      nim
      id
      user {
        email
        passwordKasih
        permissions
      }
    }
  }
`;

const MAHASISWA_UPDATE_QUERY = gql`
  mutation MAHASISWA_UPDATE_QUERY($user: UserInput, $mahasiswa: MahasiswaBaruInput, $id: ID!) {
    updateMahasiswa(user: $user, mahasiswa: $mahasiswa, id: $id) {
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

class FormEditmahasiswa extends React.Component {
  static propTypes = {
    mahasiswa: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nim: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      user: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  state = {
    email: this.props.mahasiswa.user.email || '',
    nama: this.props.mahasiswa.nama || '',
    nim: this.props.mahasiswa.nim || '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={MAHASISWA_UPDATE_QUERY}
        variables={{
          user: {
            email: this.state.email,
          },
          mahasiswa: {
            nama: this.state.nama,
            nim: this.state.nim,
          },
          id: this.props.mahasiswa.id,
        }}
        refetchQueries={[{ query: MAHASISWA_QUERY, variables: { id: this.props.mahasiswa.id } }]}
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

            <Form.Item label="nim">
              <Input
                disabled={loading}
                onChange={this.saveToState}
                value={this.state.nim}
                name="nim"
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

const ProfilMahasiswa = props => (
  <Query
    query={MAHASISWA_QUERY}
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
                  <h2>{data.mahasiswa.nama}</h2>
                  <p>
                    {data.mahasiswa.user.permissions
                      .filter(permission => !['USER'].includes(permission))
                      .join(' ')}{' '}
                    CBT FMIPA UR
                  </p>
                </div>
              </HeaderAvatar>

              <FormEditmahasiswa mahasiswa={data.mahasiswa} />
            </>
          )}
        </Card>
      );
    }}
  </Query>
);

ProfilMahasiswa.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilMahasiswa;
