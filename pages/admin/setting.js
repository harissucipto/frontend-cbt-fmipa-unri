import React from 'react';
import { Row, Col } from 'antd';

import Setting from '../../components/admin/Setting';
import UpdatePassword from '../../components/admin/UpdatePassword';

const AkunSettings = () => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={14}>
      <Setting />
    </Col>
    <Col xs={24} lg={10}>
      <UpdatePassword />
    </Col>
  </Row>
);

export default AkunSettings;
