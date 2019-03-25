import React from 'react';
import Setting from '../../components/dosen/Setting';
import { Row, Col } from 'antd';

const AkunSettings = () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24} lg={10}>
      <Setting />
    </Col>
  </Row>
);

export default AkunSettings;
