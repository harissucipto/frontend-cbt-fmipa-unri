import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Form, Input, Button, Alert, Spin, Row, Col } from 'antd';
import PesanError from '../PesanError';
import { CURRENT_DOSEN_QUERY } from './Profil';
import UpdatePassword from './UpdatePassword';

const UPDATE_DOSEN_MUTATION = gql`
  mutation UPDATE_DOSEN_MUTATION($image: String, $id: ID!, $email: String!) {
    updateMahasiswa(
      where: { id: $id }
      data: { image: $image, user: { update: { email: $email } } }
    ) {
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
    image: this.props.user.mahasiswa.image || '',
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
        mutation={UPDATE_DOSEN_MUTATION}
        variables={{
          id: this.props.user.mahasiswa.id,
          image: this.state.image,
          email: this.state.email,
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
            {loading && <Spin tip="Loading..." style={{ textAlign: 'center' }} />}

            <Form.Item label="email">
              <Input
                required
                placeholder="Email pengguna"
                value={this.state.email}
                name="email"
                onChange={this.saveToState}
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
                  <Input disabled={loading} name="image" type="file" onChange={this.uploadFile} />
                </>
              )}
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Simpan Perubahan
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
      <Row type="flex" gutter={16}>
        <Col xs={24} lg={14}>
          <Card title="Update Informasi Akun" loading={loading}>
            <FormEditPermissions user={currentMahasiswa} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <UpdatePassword id={currentMahasiswa.mahasiswa.id} />
        </Col>
      </Row>
    )}
  </Query>
);

export default ProfilDosen;
