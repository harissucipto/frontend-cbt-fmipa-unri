import React from 'react';
import styled from 'styled-components';
import { Layout, Card, Form, Input, Button, Avatar } from 'antd';
const { Content } = Layout;

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

const ProfilAdmin = () => (
  <Content>
    <Card style={{ margin: '20px', padding: '24px' }}>
      <h2>Tambah Dosen Baru</h2>
      <HeaderAvatar>
        <Avatar size={144} icon="user" />
        <div>
          <Button icon="upload">Upload photo profil</Button>
        </div>
      </HeaderAvatar>

      <Form>
        <Form.Item label="E-mail">
          <Input value="Harissucipto@gmail.com" />
        </Form.Item>

        <Form.Item label="Nama">
          <Input />
        </Form.Item>

        <Form.Item label="Password">
          <Input type="password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Tambah
        </Button>
      </Form>
    </Card>
  </Content>
);

export default ProfilAdmin;
