/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Edit from '../../../components/dosen/bank-soal/EditSoal';
import DetailBankSoal from '../../../components/dosen/bank-soal/DetailBankSoal';

const EditPage = props => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={8}>
      <DetailBankSoal id={props.query.bankSoal} />
    </Col>
    <Col xs={24} lg={16}>
      <Edit id={props.query.id} />
    </Col>
  </Row>
);
export default EditPage;
