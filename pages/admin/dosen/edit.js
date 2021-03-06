/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'antd';

import Edit from '../../../components/admin/dosen/Edit';
import UpdatePassword from '../../../components/dosen/UpdatePassword';

const AkunSettings = props => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={14}>
      <Edit id={props.query.id} />
    </Col>
    <Col xs={24} lg={10}>
      <UpdatePassword id={props.query.id} />
    </Col>
  </Row>
);

export default AkunSettings;
