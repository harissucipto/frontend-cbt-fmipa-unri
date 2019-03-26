import React from 'react';
import { Row, Col } from 'antd';

import KelolaMahasiswa from '../../../components/admin/mahasiswa/Kelola';

export default () => (
  <Row type="flex" gutter={16} style={{ margin: '40px' }}>
    <Col xs={24}>
      <KelolaMahasiswa />
    </Col>
  </Row>
);
