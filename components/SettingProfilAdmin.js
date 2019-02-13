import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Form, Input, Button, Avatar } from 'antd';
import User from './User';

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
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Form>
        <Form.Item label="E-mail">
          <Input
            value={this.state.email}
            onChange={this.saveToState}
            name="email"
            type="email"
            required
          />
        </Form.Item>

        <Form.Item label="Nama">
          <Input
            onChange={this.saveToState}
            value={this.state.nama}
            name="nama"
            type="string"
            required
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update Informasi
        </Button>
      </Form>
    );
  }
}

const ProfilAdmin = () => (
  <User>
    {({ data: { me }, loading }) => (
      <Card style={{ margin: '20px', padding: '24px' }} loading={loading}>
        <HeaderAvatar>
          <Avatar size={144} icon="user" />
          <div>
            <Button icon="upload">Ganti photo profil</Button>
          </div>
        </HeaderAvatar>

        <FormEditPermissions user={me} />
      </Card>
    )}
  </User>
);

export default ProfilAdmin;
