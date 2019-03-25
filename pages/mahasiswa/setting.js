import React from 'react';
import { Row, Col } from 'antd';

import Setting from '../../components/mahasiswa/Setting';

const AkunSettings = () => (
  <Row type="flex" gutter={16} style={{ margin: '40px', justifyContent: 'center' }}>
    <Col xs={24} lg={10}>
      <Setting />
    </Col>
  </Row>
);

export default AkunSettings;
