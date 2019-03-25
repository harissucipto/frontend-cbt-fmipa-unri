import React, { Component } from 'react';
import { Row, Col, Card, Layout } from 'antd';

import Tambah from '../../../components/dosen/bank-soal/TambahSoal';
import DetailBankSoal from '../../../components/dosen/bank-soal/DetailBankSoal';

const EditPage = props => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={8}>
      <DetailBankSoal id={props.query.id} />
    </Col>
    <Col xs={24} lg={16}>
      <Tambah id={props.query.id} />
    </Col>
  </Row>
);
export default EditPage;
