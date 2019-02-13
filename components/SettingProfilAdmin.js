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
      <HeaderAvatar>
        <Avatar size={144} icon="user" />
        <div>
          <Button icon="upload">Ganti photo profil</Button>
        </div>
      </HeaderAvatar>

      <Form>
        <Form.Item label="E-mail">
          <Input value="Harissucipto@gmail.com" />
        </Form.Item>

        <Form.Item label="Nama">
          <Input />
        </Form.Item>

        <Form.Item label="Tanggal Lahir">
          <Input type="date" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update Informasi
        </Button>
      </Form>
    </Card>
  </Content>
);

export default ProfilAdmin;
