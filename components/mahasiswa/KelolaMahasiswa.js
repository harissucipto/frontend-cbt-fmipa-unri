import React from 'react';
import Router from 'next/router';
import { Layout, Card, Input, Button, Row, Col } from 'antd';
import ListMahasiswa from './ListMahasiswa';

const { Content } = Layout;
const { Search } = Input;

const KelolaMahasiswa = () => (
  <Content>
    <Card style={{ margin: '20px', padding: '24px' }}>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={12}>
          <Button type="primary" icon="plus" onClick={() => Router.push('/mahasiswa/tambah')}>
            Tambah Mahasiswa
          </Button>
        </Col>
        <Col span={12}>
          {' '}
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            width={240}
            enterButton
          />
        </Col>
      </Row>

      <ListMahasiswa />
    </Card>
  </Content>
);

export default KelolaMahasiswa;
