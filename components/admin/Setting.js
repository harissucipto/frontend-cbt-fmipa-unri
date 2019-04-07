import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Form, Input, Button, Avatar, Alert, Spin } from 'antd';
import PesanError from '../PesanError';
import Admin, { CURRENT_ADMIN_QUERY } from './Admin';

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

const UPDATE_ADMIN_MUTATION = gql`
  mutation UPDATE_ADMIN_MUTATION($user: UserInput, $admin: AdminInput) {
    updateAdmin(user: $user, admin: $admin) {
      id
      email
      permissions
    }
  }
`;

class FormEditPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      admin: PropTypes.shape({
        nama: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  state = {
    email: this.props.user.email || '',
    nama: this.props.user.admin.nama || '',
    image: this.props.user.admin.image || '',
    loading: false,
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  uploadFile = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    console.log(files);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/pekonrejosari/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      loading: false,
    });
  };

  render() {
    return (
      <Mutation
        mutation={UPDATE_ADMIN_MUTATION}
        variables={{
          user: {
            email: this.state.email,
          },
          admin: {
            nama: this.state.nama,
            image: this.state.image,
          },
        }}
        refetchQueries={[{ query: CURRENT_ADMIN_QUERY }]}
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

            <Form.Item label="Gambar Profil">
              {this.state.loading ? (
                <Spin />
              ) : (
                <>
                  {this.state.image && (
                    <img src={this.state.image} alt="Upload Preview" width="200" />
                  )}
                  <Input
                    disabled={loading}
                    onChange={this.saveToState}
                    name="image"
                    type="file"
                    onChange={this.uploadFile}
                  />
                </>
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update Informasi
              </Button>
            </Form.Item>
          </Form>
        )}
      </Mutation>
    );
  }
}

const ProfilAdmin = () => (
  <Admin>
    {({ data: { admin }, loading }) => (
      <Card loading={loading} title="Perbarui Informasi ">
        <FormEditPermissions user={admin} />
      </Card>
    )}
  </Admin>
);

export default ProfilAdmin;
