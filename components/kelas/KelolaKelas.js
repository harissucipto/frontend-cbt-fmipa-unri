import React from 'react';
import Router from 'next/router';
import { Layout, Card, Input, Button, Row, Col } from 'antd';
import ListKelas from './ListKelas';
import Searach from './Searach';

const { Content } = Layout;
const { Search } = Input;

const KelolaKelas = () => (
  <Content>
    <Card style={{ margin: '20px', padding: '24px' }}>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={12}>
          <Button type="primary" icon="plus" onClick={() => Router.push('/matakuliah/tambah')}>
            Tambah Kelas
          </Button>
        </Col>
        <Col span={12}>
          {' '}
          {/* <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            width={240}
            enterButton
          /> */}
          <Searach />
        </Col>
      </Row>

      <ListKelas />
    </Card>
  </Content>
);

export default KelolaKelas;
