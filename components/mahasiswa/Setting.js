import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Form, Input, Button, Avatar, Alert } from 'antd';
import PesanError from '../PesanError';
import Dosen, { CURRENT_DOSEN_QUERY } from './Profil';
import UpdatePassword from './UpdatePassword';

const HeaderAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  div {
    margin-top: 20px;
    text-align: center;
  }
`;

const UPDATE_DOSEN_MUTATION = gql`
  mutation UPDATE_DOSEN_MUTATION($gambar: String, $idDosen: ID!) {
    updateMahasiswa(where: { id: $idDosen }, data: { user: { update: { gambar: $gambar } } }) {
      id
      user {
        email
      }
    }
  }
`;

class FormEditPermissions extends React.Component {
  state = {
    email: this.props.user.email || '',
    nama: this.props.user.mahasiswa.nama || '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_DOSEN_MUTATION}
        variables={{
          idDosen: this.props.user.mahasiswa.id,
          gambar: '',
          email: this.props.user.email,
        }}
        refetchQueries={[{ query: CURRENT_DOSEN_QUERY }]}
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

            <Form.Item label="Email">
              <Input value={this.state.email} onChange={this.saveToState} name="email" />
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

const ProfilDosen = () => (
  <Query query={CURRENT_DOSEN_QUERY}>
    {({ data: { currentMahasiswa }, loading }) => (
      <Card
        style={{ margin: '20px', padding: '24px', maxWidth: '480px' }}
        loading={loading}
        title="Perbarui Informasi "
      >
        <HeaderAvatar>
          <Avatar size={144} icon="user" />
          <div>
            <Button icon="upload">Ganti photo profil</Button>
          </div>
        </HeaderAvatar>
        <FormEditPermissions user={currentMahasiswa} />
        <UpdatePassword id={currentMahasiswa.mahasiswa.id} />
      </Card>
    )}
  </Query>
);

export default ProfilDosen;
