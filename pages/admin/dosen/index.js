import React from 'react';
import { Row, Col } from 'antd';

import KelolaDosen from '../../../components/admin/dosen/Kelola';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24}>
      <KelolaDosen />
    </Col>
  </Row>
);
